const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      domain: require.resolve('domain-browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      zlib: require.resolve('browserify-zlib'),
      console: require.resolve('console-browserify'),
      vm: require.resolve('vm-browserify'),
      constants: require.resolve('constants-browserify'),
      async_hooks: false,
      child_process: false,
      net: false,
      repl: false,
      tls: false,
      'fs/promises': false,
      'util/types': false,
      'worker_threads': false,
      'stream/web': false,
      'perf_hooks': false,
      'module': false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // Add any required plugins here
  ],
  devServer: {
    static: './dist',
  },
};
