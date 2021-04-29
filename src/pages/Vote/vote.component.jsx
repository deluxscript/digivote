import React, { Component } from 'react';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';

class Vote extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    componentDidMount(){
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        // const account = web3.eth.getAccounts().then((useAccount) => {
        //     return useAccount[0]
        // });
        const account = "0xA4C37D0431F3D11c00958d56dd3896Baa29b334c";
        const account2 = "0x09287709a2c5a293ee53917d94f845822ca77213";
        let contract = new web3.eth.Contract(votingAbi, account);
        console.log("Lets get the contracr: ",contract)

        const candidateName = "Abisoye Oyinlola";

        contract.methods.vote(web3.utils.asciiToHex(candidateName)).send({from: account2}).then((f) => {
            console.log("result", f)
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