const AddCandidate = (props) => (
    <div className="border-2">
        <div className="text-xl px-4 py-2 brandbg text-white mb-4">Candidates</div>
        {props.candidates.map((candidate, id) => (
            <div key={id} className="py-2 px-4">
                <input
                    id={`${Math.floor(Math.random() * 8846) + 2453}`}
                    type="text"
                    placeholder={`Candidate ${id + 1} name`}
                    value={candidate.name}
                    className="inputField w-3/5"
                    onChange={props.candidateNameChange(id)}
                />
                <button
                    type="button"
                    onClick={props.removeCandidate(id)}
                    className="removeVoter px-3 py-2 mx-4 rounded bg-red-600 text-white font-bold focus:outline-none"
                >
                X
                </button>
            </div>
        ))}
        <div className="px-4">
            <button
                type="button"
                onClick={props.addCandidate}
                className="bg-green-500 white rounded-lg text-white py-2 px-4 focus:outline-none"
            >
                Add Candidate
            </button>
        </div>
    </div>
);

export default AddCandidate;