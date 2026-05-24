type View = 'garage' | 'winners'

interface Props {
    activeView: View
    onChange: (view: View) => void
}

const Navigation = ({ activeView, onChange }: Props): React.ReactElement => (
    <div className="flex items-center justify-between">
        <div className="flex gap-4">
            <button
                onClick={() => onChange('garage')}
                type="button"
                className={`btn ${
                    activeView === 'garage' ? 'btn-primary' : 'btn-outline'
                }`}
            >
                Garage
            </button>

            <button
                onClick={() => onChange('winners')}
                type="button"
                className={`btn ${
                    activeView === 'winners' ? 'btn-secondary' : 'btn-outline'
                }`}
            >
                Winners
            </button>
        </div>

        <h1 className="text-4xl font-black tracking-widest text-cyan-400">
            ASYNC RACE
        </h1>
    </div>
)

export default Navigation
