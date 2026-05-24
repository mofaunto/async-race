const RaceControls = (): React.ReactElement => (
    <div className="flex flex-wrap gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <button className="btn btn-success" type="button">
            Race
        </button>

        <button className="btn btn-error" type="button">
            Reset
        </button>
    </div>
)

export default RaceControls
