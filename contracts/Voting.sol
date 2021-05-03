 // SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

/**
 * @title Voting
 */
contract Voting {
    
   struct Voter {
       bool voted;
       uint vote;
   }
   
   struct Candidate {
       uint id;
       string name;
       uint voteCount;
   }
   
   mapping(address => Voter) public voters;
   mapping(uint => Candidate) public candidates;
   
   address public electoralBody;
   
   uint public candidatesCount;
   
   
    function addCandidate (string memory candidateName, uint candidatesId) public {
        electoralBody = msg.sender;
        candidates[candidatesId] = Candidate(candidatesId, candidateName, 0);
        candidatesCount ++;
    }
    
    function vote(uint candidatesId) public {
        Voter storage sender = voters[msg.sender];
        //require(sender.validated != validateVoter, "No voting rights");
        require(!sender.voted, "Already voted.");
        
        sender.voted = true;
        sender.vote = candidatesId;
        candidates[candidatesId].voteCount ++;
    }
    
    function candidateVoteCount(uint candidatesId) public view returns (uint totalCount) {
        totalCount = candidates[candidatesId].voteCount;
     }
    
}
