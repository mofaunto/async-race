'use client'

import useGarageStore from '@/shared/store/garage.store'

import RaceLane from './race-lane'

const RaceTrack = (): React.ReactElement => {
    const { cars } = useGarageStore()

    if (cars.length === 0) {
        return (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                <p className="text-lg text-zinc-400">No cars in garage</p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            {cars.map(car => (
                <RaceLane key={car.id} car={car} />
            ))}
        </div>
    )
}

export default RaceTrack
