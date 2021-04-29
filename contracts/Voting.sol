 // SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

/** 
 * @title Voting
 */
contract Voting {
    
    event AddedCandidate(uint candidateID);
   
    struct Voter {
        uint weight;
        bytes32 uid;
        address candidateID;
        bool voted;
        uint vote;
    }
    
    struct Candidate {
        bytes32 name;
        bool doesExist;
        uint voteCount;
    }
    
    mapping(address => Voter) public voters;
    mapping(uint => Candidate) public candidates;
    
    address public electoralbody;
    
    uint numCandidates;
    uint numVoters;
    
    function addCandidate(bytes32 name) public {
        uint candidateID = numCandidates++;
        candidates[candidateID] = Candidate(name,true,0);
        emit AddedCandidate(candidateID);
    }
    
    function giveRightToVote(address voter) public {
        require(
            msg.sender == electoralbody,
            "Electoral body gives right to"
        );
        require(
            !voters[voter].voted,
            "Voter already voted"
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }
    
    function vote(uint candidate) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = candidate;
        candidates[candidate].voteCount += sender.weight;
    }
    
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < numVoters; p++) {
            if (candidates[p].voteCount > winningVoteCount) {
                winningVoteCount = candidates[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    
    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }
    
}
