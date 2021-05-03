import React from "react";
import { useRouteMatch } from "react-router-dom";
import axios from 'axios';
import Web3 from 'web3';
import {votingAbi} from '../../config/abi';
import Spinner from "../../components/Spinner/spinner.component";

const Election = () => {
    let match = useRouteMatch();
    const validBallotId = parseInt(match.params.ballotId);


    let candidateHTML = validBallotId ? <p>Data refuses to load</p> : <Spinner/>
    const [ballotData, setBallotData] = React.useState([]);
    const [voterData, setVoterData] = React.useState([]);
    const [candidateData, setCandidateData] = React.useState([]);

    const grabBallotData = async() => {
        const response = await axios.get(`http://localhost:8080/ballots/?ballotId=${validBallotId}`)
        setBallotData(response);
    };
    const grabVoterData = async() => {
        const response = await axios.get(`http://localhost:8080/voters/?ballotId=${validBallotId}`)
        setVoterData(response);
    };
    const grabCandidateData = async() => {
        const response = await axios.get(`http://localhost:8080/candidates/?ballotId=${validBallotId}`)
        setCandidateData(response);
    };

    React.useEffect(() => {
        grabBallotData();
    }, [validBallotId])

    React.useEffect(() => {
        grabVoterData();
    }, [validBallotId])

    React.useEffect(() => {
        grabCandidateData();
    }, [validBallotId])
    
    if(ballotData.data && voterData.data && candidateData.data){


    const vote = (candidateId) => {
        const account2 = "0xFf236782766276E7EB92C41D238aAd3041034202";
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const gasLimit = 300000
        const contractAddress = ballotData.data.map((data) => {
            return data.contractAddress;
        })
        const contract = new web3.eth.Contract(votingAbi, contractAddress[0], {gas: gasLimit});
        candidateData.data.map((data) => data.candidates.map(candidate => {
            if(candidate.id === candidateId){
                contract.methods.vote(candidate.id).send({from: account2}).then((f) => {
                    console.log("vote", f)
                })
            }
            return candidate
        }
        
        ));
    }
        candidateHTML = (
            <div>
            {
                ballotData.data.map(data  => 
                    <div className="text-center py-8" key={data.ballotId}>
                        <h2 className="text-3xl">{data.bodyName}</h2>
                        <p>{data.note}</p>
                    </div>
                )
            }
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="bg-blue-100 border text-left px-8 py-4">Candidate Name</th>
                        <th className="bg-blue-100 border text-left px-8 py-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    candidateData.data.map(data => {
                        return data.candidates.map(candidate => {
                            return(
                                <tr key={candidate.name}>
                                    <td className="border px-8 py-4">{candidate.name}</td>
                                    <td className="border px-8 py-4">
                                        <div>
                                            <button className="bg-green-500 white rounded-lg text-white py-2 px-4 focus:outline-none" type="button" onClick={() => vote(candidate.id)}>
                                                Vote
                                            </button>
                                            <p>Voted</p>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    })
                }
                </tbody>
            </table>
            </div>
        )
    }

    
    return(
        <div>
            {candidateHTML}
        </div>
    );
}

export default Election;