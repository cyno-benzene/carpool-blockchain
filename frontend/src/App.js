import './App.css';
import { useState, useEffect } from "react";
// import { ethers } from "ethers";
import { getWeb3 } from "./web3";
import CarPool_sol from './CarPool_sol.json';
const ethers = require("ethers");

const App = () => {

  const [route, setRoute] = useState("");
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [rides, setRides] = useState([]);
  const [contract, setContract] = useState([]);
  const [riderAddress, setRiderAddress] = useState("");

  useEffect(() => {
    async function initialize() {
      const web3Instance = getWeb3(); // Initialize Web3 provider.
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      getWeb3(web3Instance);

      // Paste your deployed-contract address
      const contractAddress = process.env.REACT_APP_DEPLOYED_ADDRESS;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, CarPool_sol, signer);
      setContract(contractInstance);

      // Fetch the initial contacts as soon as the component mounts.
      refreshRides();
    }
    initialize();
  }, []);

  const createRide = async () => {
    await contract.methods.createRide(route, seats, price).send({ from: process.env.REACT_APP_USER_ADDRESS });
    alert("Ride created successfully")
  }
  const bookRide = async () => {
    await contract.methods.bookRide(rides.lastIndexOf()).send({ from: process.env.REACT_APP_USER_ADDRESS, value: getWeb3.utils.toWei(price, "ether") });
    alert("Ride booked successfully!");
  }

  const refreshRides = async () => {
    if (contract) {
      const allRides = await contract.methods.getRide();
      setRides(allRides);
    }
  };


  return (
    <div className="App">
      <h2>Hello</h2>
      <div>
        <h2>Create Ride</h2>
        <label for="route" >Route:</label>
        <input
          type="text"
          placeholder="Enter route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />

        <br />

        <label for="seats">Available Seats:</label>

        <input
          type="number"
          placeholder="Enter number of seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />

        <br />

        <label for="price">Price Per Seat (ETH):</label>

        <input
          type="number"
          placeholder="Enter price per seat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button onClick={createRide}>Create Ride</button>

        <h2>Book Ride</h2>
        <label for="rideId">Ride ID:</label>
        <input
          type="number"
          placeholder="Enter price per seat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button onClick={bookRide}>Book Ride</button>


      </div>

    </div>
  );
}

export default App;
