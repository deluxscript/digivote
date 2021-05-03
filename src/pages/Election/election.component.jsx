import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';

class Election extends Component {
    constructor(props){
        super(props)

        this.state = {
            ballot: [],
            candidates: []
        }
    }

    grabData(){
        const validBallotId = this.props.match.params.ballotId;
        const getBallot = axios.get(`http://localhost:8080/ballots/?ballotId=${validBallotId}`)
        const getCandidates = axios.get(`http://localhost:8080/candidates/?ballotId=${validBallotId}`)

        Promise.all([getBallot, getCandidates]).then(axios.spread((ballotResponse, candidateResponse) => {
            const ballot = ballotResponse.data;
            const candidates = candidateResponse.data;
            ballot.map(data => this.setState({ballot: data}))
            candidates.map(data => this.setState({candidates: data.candidates}))
        })).catch(errors => {
            console.log(errors);
        })
    }

    vote(candidateId) {
        const account2 = "0xE3ABDCd3a65d7fc8dEe3f67150474d9744D1Bd4d";
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const gasLimit = 300000;
        const contractAddress = this.state.ballot.contractAddress;
        const contract = new web3.eth.Contract(votingAbi, contractAddress, {gas: gasLimit});
        contract.methods.vote(candidateId).send({from: account2}).then((f) => {
            contract.methods.candidates(candidateId).call().then((response) => {
                console.log('vote count', response.voteCount)
            })
        })
    }

    componentDidMount(){
        this.grabData();
    }

    render(){
        const ballotData = this.state.ballot;
        const candidateData = this.state.candidates;
        return(
            <div>
                <div className="text-center py-8">
                    <h2 className="text-3xl">{ballotData.bodyName}</h2>
                    <p>{ballotData.note}</p>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="bg-blue-100 border text-left px-8 py-4">Candidate Name</th>
                            <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        candidateData.map(candidate => 
                            <tr key={candidate.name}>
                                <td className="border px-8 py-4">{candidate.name}</td>
                                <td className="border px-8 py-4">
                                    <div className="flex">
                                        <button className="bg-green-500 white rounded-lg text-white py-2 px-4 focus:outline-none" type="button" onClick={() =>this.vote(candidate.id)}>
                                            Vote
                                        </button>
                                        <p className="py-2 px-4 text-green-500">Voted!</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default withRouter(Election);