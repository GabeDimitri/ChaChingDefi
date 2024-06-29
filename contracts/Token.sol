// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract Token {
    string public name ;        
    string public symbol ;
    uint256 public decimals =18 ; 
    uint256 public totalSupply;
      // track balances
    mapping(address=>uint256) public balanceOf;
    mapping(address=>mapping (address => uint256)) public allowance;   
    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 value
    );


    event Approval(address indexed owner, address indexed spender, uint256 value);


 // send tokens
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply)
    {
        name = _name; 
        symbol = _symbol;
        totalSupply = _totalSupply * (10**decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(address _to, uint256 _value) 
    public 
    returns (bool success)
    {

        //require sender has enough tokens
        require(balanceOf[msg.sender]>=_value);
        require(_to!=address(0)); 
        //dedeuct token from spender
        balanceOf[msg.sender]=balanceOf[msg.sender] - _value;
        //credit tokens to reciver
        balanceOf[_to]=balanceOf[_to]+_value;

        //emit event
        emit Transfer(msg.sender,_to,_value);
        return true;
    }
    function approve(address _spemder, uint256 _value) public returns(bool success){
        require(_spemder!=address(0));

        allowance[msg.sender][_spemder]= _value;
        emit Approval(msg.sender,_spemder,_value);
        return true;
    }
}
