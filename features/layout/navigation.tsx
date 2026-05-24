type View = 'garage' | 'winners'

interface Props {
    activeView: View
    onChange: (view: View) => void
}

const Navigation = ({ activeView, onChange }: Props): React.ReactElement => (
    <header className="mx-auto flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex justify-center gap-3 sm:justify-start">
            <button
                onClick={() => onChange('garage')}
                type="button"
                className={`btn btn-sm sm:btn-md ${
                    activeView === 'garage' ? 'btn-primary' : 'btn-outline'
                }`}
            >
                Garage
            </button>

            <button
                onClick={() => onChange('winners')}
                type="button"
                className={`btn btn-sm sm:btn-md ${
                    activeView === 'winners' ? 'btn-secondary' : 'btn-outline'
                }`}
            >
                Winners
            </button>
        </div>

        <h1 className="text-center text-2xl font-black tracking-widest text-cyan-400 sm:text-4xl">
            ASYNC RACE
        </h1>
    </header>
)

export default Navigation
