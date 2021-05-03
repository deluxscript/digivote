import React, { Component } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';
import { withRouter } from 'react-router-dom';

class VoteDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadCandidate: [],
            voteResult: [],
            ballot: []
        }
    }

    loadBallotData(){
        const ballotId = this.props.match.params.ballotId;
        axios.get(`http://localhost:8080/ballots/?ballotId=${ballotId}`)
            .then(res => {
                const response = res.data;
                response.map(data => this.setState({ballot: data}))
            })
            .catch(error =>
                    console.log(error)
            );
    }

    loadCandidateData(){
        const ballotId = this.props.match.params.ballotId;
        axios.get(`http://localhost:8080/candidates/?ballotId=${ballotId}`)
            .then(res => {
                const response = res.data;
                response.map(data => this.setState({loadCandidate: data.candidates}))
            })
            .catch(error =>
                    console.log(error)
                );
    }

    loadVote(candidates, address){
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const gasLimit = 300000;
        const contractAddress = address;
        const contract = new web3.eth.Contract(votingAbi, contractAddress, {gas: gasLimit});

        candidates.map(candidate => {
            return contract.methods.candidates(candidate.id).call().then((response) => {
                this.setState({voteResult: [...this.state.voteResult, response]});
            })
        })
    }

    componentDidMount(){
        this.loadCandidateData();
        this.loadBallotData();
        const validBallotId = this.props.match.params.ballotId;
        axios.get(`http://localhost:8080/ballots/?ballotId=${validBallotId}`)
        .then(response => {
            response.data.map(data => {
                return this.loadVote(this.state.loadCandidate, data.contractAddress);
            })

            
        })
    }

    render(){
        const ballotData = this.state.ballot;
        return(
            <div>
                <div className="text-center py-8">
                    <h2 className="text-3xl my-3">Election Result</h2>
                    <h2 className="text-2xl">{ballotData.bodyName}</h2>
                    <p>{ballotData.note}</p>
                </div>
                <table className="w-full">
                <thead>
                    <tr>
                        <th className="bg-blue-100 border text-left px-8 py-4">Candidate Name</th>
                        <th className="bg-blue-100 border text-left px-8 py-4">Vote Count</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.voteResult.map(candidate => 
                        <tr key={candidate.name}>
                            <td className="border px-8 py-4">{Web3.utils.hexToAscii(candidate.name)}</td>
                            <td className="border px-8 py-4">
                                <div className="flex">
                                    <p className="py-2 px-4 text-green-500">{candidate.voteCount}</p>
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


export default withRouter(VoteDashboard);