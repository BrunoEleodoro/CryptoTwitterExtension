// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CryptoTwitterContract {
    constructor() {
        // constructor
    }

    // mapping of address to string
    mapping(address => string) public twitterHandles;

    // function to set twitter handle
    function setTwitterHandle(string memory _twitterHandle) public {
        twitterHandles[msg.sender] = _twitterHandle;
    }

    // function to get twitter handle
    function getTwitterHandle(
        address _user
    ) public view returns (string memory) {
        return twitterHandles[_user];
    }
}
