// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract CryptoTwitterContract {
    constructor() {
        // constructor
    }

    // mapping of address to string
    mapping(address => string) public twitterHandles;
    // the opposite too
    mapping(string => address) public twitterHandlesReverse;

    // function to set twitter handle
    function setTwitterHandle(string memory _twitterHandle) public {
        twitterHandles[msg.sender] = _twitterHandle;
        twitterHandlesReverse[_twitterHandle] = msg.sender;
    }

    // function to get twitter handle
    function getTwitterHandle(
        address _user
    ) public view returns (string memory) {
        return twitterHandles[_user];
    }

    // function to get address
    function getAddress(
        string memory _twitterHandle
    ) public view returns (address) {
        return twitterHandlesReverse[_twitterHandle];
    }
}
