// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public count;

    constructor() {
        count = 0;
    }

    function incrementCount() public {
        count++;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
