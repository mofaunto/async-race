'use client'

import { useState } from 'react'

import useGarageStore from '@/shared/store/garage.store'

const DEFAULT_COLOR = '#3b82f6'

const GarageActions = (): React.ReactElement => {
    const { createCar, generateCars } = useGarageStore()

    const [carName, setCarName] = useState('')
    const [carColor, setCarColor] = useState(DEFAULT_COLOR)

    const handleCreateClick = async (): Promise<void> => {
        if (!carName.trim()) return

        await createCar({
            name: carName,
            color: carColor
        })

        setCarName('')
        setCarColor(DEFAULT_COLOR)
    }

    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white">
                    Garage Controls
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                    Create and manage your race cars
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">
                        Car Name
                    </span>

                    <input
                        className="h-12 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 text-white outline-none focus:border-cyan-500"
                        id="car-name-input"
                        maxLength={30}
                        onChange={e => setCarName(e.target.value)}
                        placeholder="Nissan Skyline"
                        type="text"
                        value={carName}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">
                        Color
                    </span>

                    <div className="flex h-12 items-center">
                        <input
                            className="h-12 w-full cursor-pointer rounded-md border border-zinc-700 bg-transparent"
                            onChange={e => setCarColor(e.target.value)}
                            type="color"
                            value={carColor}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">
                        Action
                    </span>

                    <button
                        className="h-12 w-full rounded-md bg-cyan-600 font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
                        disabled={!carName.trim()}
                        onClick={handleCreateClick}
                        type="button"
                    >
                        Create Car
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-zinc-500">
                        Bulk
                    </span>

                    <button
                        className="h-12 w-full rounded-md border border-yellow-500 text-yellow-400 transition hover:bg-yellow-500/10"
                        type="button"
                        onClick={async () =>
                            generateCars().catch(() => undefined)
                        }
                    >
                        Generate 100 Cars
                    </button>
                </div>
            </div>
        </section>
    )
}

export default GarageActions
