
# DIGIVOTE - Decentralized Electronic Voting System

A brief description of what this project does and who it's for


## Problem Statement

Security of digital voting is a big concern, and this can affect the integrity of the democratic process. Voter fraud has also been an issue in the democractic process most importantly wher digital voting has been used whereby non-authenticated users are still permitted to vote, or the digital tool is being manipulated. This in general and more have put a dent on the democratic process.

  
## Aim of the project

- Eliminate voter fraud
- secure and decentralised voting system
- Anonymity and Integrity

  
## Documentation

[Documentation](https://docs.google.com/document/d/1vD89LZN-N5Iy_U7sCRQpeoZmt7tq5mzRQHjbmsC9gbo/edit?usp=sharing)

  
## Deployment

This project consist of 3 part(ReactJs, NodeJs/ExpressJs, Solidty/Truffle) which must run simultenously

## Prerequisites
Install these prerequisites:
- NPM: https://nodejs.org
- Truffle: https://github.com/trufflesuite/truffle
- Ganache: http://truffleframework.com/ganache/
- MongoDB Compass: https://www.mongodb.com/products/compass

### Step One
Clone this project `git clone https://github.com/deluxscript/digivote.git`

#### Step 1.1
Clone the backend folder in another directory `git clone https://github.com/deluxscript/digiVoteBackend.git`

#### Step 1.2 - OPTIONAL
Open and install MongoDB Compass, Copy the mongoURI string in the root folder `/digiVoteBackend/config/default.json` to the new connection field so visualize all data coming in

#### Step 1.3
Run `npm start` to start the backend server on port 8080

### Step two
Install all dependenciies
```
$ cd digivote
$ npm install
```

### Step Three
Open the install Genache GUI, the GUI comes with 10 addresses with 100ETH balance each

### Step Four
On the terminal from `/digivote` directory, run the following command to deploy the smart contract

` $ truffle migrate --reset ` This must be done at every attempt Genache is restarted

### Step Five
Create `.env` file in the root folder to store two ethereum address using the below variable
```
REACT_APP_DIGIVOTE_ELECTORAL_BODY_ADDRESS= {ANY ADRESS FROM GENACHE ACOUNT}
REACT_APP_DIGIVOTE_VOTER_ADDRESS= {ANY ADRESS FROM GENACHE ACOUNT excluding the one used above}
```

### Step Six
Start the application `npm start` on port 3000, visit browser at http://localhost:3000