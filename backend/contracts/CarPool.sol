// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;

contract CarPool {
    struct Ride {
        address driver;
        string route;
        uint256 availableSeats;
        uint256 pricePerSeat;
        bool isActive;
        mapping(address => bool) passengers;
    }

    mapping(uint256 => Ride) public rides;
    uint256 public ridesCount;

    event RideCreated(uint256 rideId, address indexed driver, string route, uint256 availableSeats, uint256 pricePerSeat);
    event RideBooked(uint256 rideId, address indexed passenger);

    function createRide(string memory _route, uint256 _availableSeats, uint256 _pricePerSeat) public {
        require(_availableSeats > 0, "At least one seat must be available");
        require(_pricePerSeat > 0, "Price per seat must be greater than zero");

        // Initialize the Ride struct in storage
        Ride storage newRide = rides[ridesCount];
        newRide.driver = msg.sender;
        newRide.route = _route;
        newRide.availableSeats = _availableSeats;
        newRide.pricePerSeat = _pricePerSeat;
        newRide.isActive = true;

        emit RideCreated(ridesCount, msg.sender, _route, _availableSeats, _pricePerSeat);
        ridesCount++;
    }

    function bookRide(uint256 _rideId) public payable {
        require(_rideId < ridesCount, "Invalid ride ID");
        require(rides[_rideId].isActive, "Ride is not active");
        require(rides[_rideId].availableSeats > 0, "No available seats");
        require(msg.value >= rides[_rideId].pricePerSeat, "Insufficient funds");

        rides[_rideId].passengers[msg.sender] = true;
        rides[_rideId].availableSeats--;
        emit RideBooked(_rideId, msg.sender);
    }

    function getRide(uint256 _rideId) public view returns (address, string memory, uint256, uint256, bool) {
        return (rides[_rideId].driver, rides[_rideId].route, rides[_rideId].availableSeats, rides[_rideId].pricePerSeat, rides[_rideId].isActive);
    }
}
