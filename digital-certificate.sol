// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalCertificate {
    struct Certificate {
        address owner;
        string name;
        string description;
        uint256 issueDate;
        uint256 expiryDate;
    }

    mapping(uint256 => Certificate) public certificates;
    uint256 public certificateCount;

    event CertificateIssued(uint256 indexed certificateId, address indexed owner);

    constructor() {
        certificateCount = 0;
    }

    modifier onlyOwner(uint256 _certificateId) {
        require(
            certificates[_certificateId].owner == msg.sender,
            "Only the owner can perform this action"
        );
        _;
    }

    function issueCertificate(
        string memory _name,
        string memory _description,
        uint256 _expiryDate
    ) public {
        certificateCount++;
        certificates[certificateCount] = Certificate(
            msg.sender,
            _name,
            _description,
            block.timestamp,
            _expiryDate
        );
        emit CertificateIssued(certificateCount, msg.sender);
    }
}




