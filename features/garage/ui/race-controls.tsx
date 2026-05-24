'use client'

import useGarageStore from '@/shared/store/garage.store'

const RaceControls = (): React.ReactElement => {
    const { startRace, resetRace, raceStatus } = useGarageStore()

    const isRunning = raceStatus === 'running'
    const isIdle = raceStatus === 'idle'

    return (
        <div className="flex flex-wrap gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <button
                className="btn btn-success"
                disabled={isRunning}
                type="button"
                onClick={() => {
                    startRace().catch(() => undefined)
                }}
            >
                Race
            </button>

            <button
                className="btn btn-error"
                disabled={isIdle}
                type="button"
                onClick={() => {
                    resetRace()
                }}
            >
                Reset
            </button>
        </div>
    )
}

export default RaceControls
