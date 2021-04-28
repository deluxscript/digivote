const AddVoter = (props) => (
    <div className="border-2">
        <div className="text-xl px-4 py-2 brandbg text-white mb-4">Voters</div>
        {props.voters.map((voter, id) => (
            <div key={id} className="py-2 px-4">
                <input
                    type="email"
                    placeholder={`Voter ${id + 1} email`}
                    value={voter.email}
                    className="inputField w-3/5"
                    onChange={props.voterEmailChange(id)}
                />
                <button
                    type="button"
                    onClick={props.removeVoter(id)}
                    className="removeVoter px-3 py-2 mx-4 rounded bg-red-600 text-white font-bold focus:outline-none"
                >
                X
                </button>
            </div>
        ))}
        <div className="px-4">
            <button
                type="button"
                onClick={props.addVoter}
                className="bg-green-500 white rounded-lg text-white py-2 px-4 focus:outline-none"
            >
                Add Voter
            </button>
        </div>
    </div>
);

export default AddVoter;