import React, { Component } from 'react';
import Master from '../ballot-forms/master.component';
import axios from 'axios';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';
import {bytecode} from '../../config/bytecode';

class Ballot extends Component {
    constructor(props) {
        super(props)

        this.state = {
            adminEmail: '',
            ballotId: 1,
            bodyName: '',
            bodyLoc: '',
            candidates: [{name: "", id: ""}],
            contractAddress: '',
            note: '',
            voters: [{email: ""}],
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitBallot = this.submitBallot.bind(this)
    }

    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleAddCandidate = () => {
        this.setState({
            candidates: this.state.candidates.concat([{ name: "", id: "" }])
        });
    }

    handleCandidateNameChange = id => event => {
        const updatedCandidate = this.state.candidates.map((candidate, idx) => {
            if(id !== idx) return candidate;
            return {...candidate, name: event.target.value, id: event.target.id}
        });

        this.setState({ candidates: updatedCandidate});
    }

    handleRemoveCandidate = id => () => {
        this.setState({
            candidates: this.state.candidates.filter((x, idx) => id !== idx)
        });
    }

    handleAddVoter = () => {
        this.setState({
            voters: this.state.voters.concat([{ email: "" }])
        });
    }

    handleVoterEmailChange = id => event => {
        const updatedVoter = this.state.voters.map((voter, idx) => {
            if(id !== idx) return voter;
            return {...voter, email: event.target.value}
        });

        this.setState({ voters: updatedVoter});
    }

    handleRemoveVoter = id => () => {
        this.setState({
            voters: this.state.voters.filter((x, idx) => id !== idx)
        });
    }

    componentDidMount(){
        const account = "0x9F7b10dffFf96bE407C68e78c2A8E0163E1Ec583";
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        let votingContract = new web3.eth.Contract(votingAbi);
        const ballotID = this.state.ballotId;

        axios.get('http://localhost:8080/ballots/latest')
            .then(res => {
                const data = res.data[0];
                if(data){
                    let latestBallotId = data.ballotId;
                    if(latestBallotId > ballotID || latestBallotId === ballotID){
                        this.setState({ballotId: latestBallotId + 1})
                    }
                }
            })

        votingContract.deploy({
            data: bytecode, 
            arguments: []
            }).send({
                from: account, 
                gas: '4700000'
            }).then((newContract) => {
                this.setState({contractAddress: newContract.options.address});
            })
    }

    addCandidateToContract(candidateName,candidatesId){
        const account = "0x9F7b10dffFf96bE407C68e78c2A8E0163E1Ec583";
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const gasLimit = 300000
        const contractAddress = this.state.contractAddress;

        const contract = new web3.eth.Contract(votingAbi, contractAddress, {gas: gasLimit});

        contract.methods.addCandidate(web3.utils.asciiToHex(candidateName), candidatesId).send({from: account}).then((f) => {
            console.log("Candidate added to blockchain", f);
        })
    }

    submitBallot(e){
        e.preventDefault();

        const candidates = this.state.candidates;
        candidates.map(candidate => {
            return this.addCandidateToContract(candidate.name, candidate.id);
        })

        const ballotObject = {
            ballotId: this.state.ballotId,
            bodyName: this.state.bodyName,
            adminEmail: this.state.adminEmail,
            note: this.state.note,
            bodyLoc: this.state.bodyLoc,
            contractAddress: this.state.contractAddress
        }

        const candidatesObject = {
            ballotId: this.state.ballotId,
            candidates: this.state.candidates
        }

        const votersObject = {
            ballotId: this.state.ballotId,
            voters: this.state.voters
        }

        const ballotRequest = axios.post('http://localhost:8080/ballots/add', ballotObject);
        const candidateRequest = axios.post('http://localhost:8080/candidates/add', candidatesObject);
        const voterRequest = axios.post('http://localhost:8080/voters/add', votersObject);

        Promise.all([ballotRequest, candidateRequest, voterRequest]).then(axios.spread((ballotResponse, candidateResponse, voterResponse) => {
            console.log(ballotResponse.data);
            console.log(candidateResponse.data);
            console.log(voterResponse.data);
        })).catch(errors => {
            console.log(errors);
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.submitBallot}>
                    <Master
                        bodyName={this.state.bodyName}
                        bodyLoc={this.state.bodyLoc}
                        adminEmail={this.state.adminEmail}
                        note={this.state.note}
                        handleChange={this.handleChange}
                        allCandidates={this.state.candidates}
                        addCandidate={this.handleAddCandidate}
                        candidateNameChange={this.handleCandidateNameChange}
                        removeCandidate={this.handleRemoveCandidate}
                        allVoters={this.state.voters}
                        addVoter={this.handleAddVoter}
                        voterEmailChange={this.handleVoterEmailChange}
                        removeVoter={this.handleRemoveVoter}
                        ballotID={this.state.ballotId}
                    />
                    <div className="mt-8">
                        <input type="submit" value="Submit" className="rounded-full py-3 px-6 btn focus:outline-none" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Ballot