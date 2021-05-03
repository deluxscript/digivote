import React, { Component } from 'react';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';
import {bytecode} from '../../config/bytecode';

class Vote extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount(){
        const account = "0x9F7b10dffFf96bE407C68e78c2A8E0163E1Ec583";
        const account2 = "0xA2E54781c34Fd42ce4f818116E6A015Fda76940F";
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        // let votingContract = new web3.eth.Contract(votingAbi);
        // votingContract.deploy({
        //             data: bytecode, 
        //             arguments: []
        //             }).send({
        //                 from: account, 
        //                 gas: '4700000'
        //             }).then((newContract) => {
        //                 votingContract.options.address = newContract.options.address;
        //                 console.log('newContract: ',newContract.options.address);
        //                 console.log('deployedContract: ',votingContract.options.address);
        //             })
        // console.log("outside variable: ", votingContract.options.address);
        const contractAddress = '0xBD5574DEc3CeACCBd35487fE72771a681B44Fa2F';
        const gasLimit = 300000
        let contract = new web3.eth.Contract(votingAbi, contractAddress, {gas: gasLimit});
        console.log("Lets get the contracr: ",contract)

        const candidateName = "Abisoye Oyinlola";
        const candidatesId = 52436;

        // contract.methods.addCandidate(web3.utils.asciiToHex(candidateName), candidatesId).send({from: account}).then((f) => {
        //     console.log("Add Candidate", f);
        // })

        contract.methods.vote(candidatesId).send({from: account2}).then((f) => {
            console.log("vote", f)
            // contract.methods.candidates(candidatesId).call().then((response) => {
            //     console.log('vote count', response)
            // })
            
        })
        
    }
    render(){
        return(
            <div>
                This is the voting page
            </div>
        )
    }
}

export default Vote;