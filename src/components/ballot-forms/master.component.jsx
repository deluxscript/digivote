import "./ballot.css";
import AddVoter from "./addVoter.component";
import AddCandidate from "./addCandidate.component";

const Master = (props) => (
    <div>
        <div className="py-2">
            <p className="formTextColor mb-2">Election-Body Name</p>
            <input
                id="bodyName"
                name="bodyName"
                type="text"
                value={props.bodyName}
                onChange={props.handleChange}
                className="inputField w-full"
            />
        </div>
        <div className="py-2">
            <p className="formTextColor mb-2">Election-Body Location</p>
            <input
                id="bodyLoc"
                name="bodyLoc"
                type="text"
                value={props.bodyLoc}
                onChange={props.handleChange}
                className="inputField w-full"
                placeholder="City, Country"
            />
        </div>
        <div className="py-2">
            <p className="formTextColor mb-2">Administrator's email</p>
            <input
                id="adminEmail"
                name="adminEmail"
                type="text"
                value={props.adminEmail}
                onChange={props.handleChange}
                className="inputField w-full"
            />
        </div>
        <div className="py-2">
            <p className="formTextColor mb-2">Election Note</p>
            <textarea
                id="note"
                name="note"
                type="textarea"
                value={props.note}
                onChange={props.handleChange}
                className="inputField w-full"
            >
            </textarea>
        </div>
        <div className="py-2">
            <AddCandidate ballotId = {props.ballotID} candidates={props.allCandidates} addCandidate={props.addCandidate} candidateNameChange={props.candidateNameChange} removeCandidate={props.removeCandidate}/>
        </div>
        <div className="py-2">
            <AddVoter ballotId = {props.ballotID} voters={props.allVoters} addVoter={props.addVoter} voterEmailChange={props.voterEmailChange} removeVoter={props.removeVoter} />
        </div>
    </div>
);

export default Master;