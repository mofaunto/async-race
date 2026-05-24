'use client'

import { useState } from 'react'

import useGarageStore from '@/shared/store/garage.store'

const DEFAULT_COLOR = '#3b82f6'

const GarageActions = (): React.ReactElement => {
    const { createCar, fetchCars } = useGarageStore()

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

    const handleGenerateCars = async (): Promise<void> => {
        try {
            await fetchCars()
        } catch {
            // ignore
        }
    }

    return (
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-white">
                    Garage Controls
                </h2>

                <p className="text-sm text-zinc-400">
                    Create and manage your race cars
                </p>
            </div>

            <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-2">
                    <label
                        className="text-xs uppercase tracking-wide text-zinc-500"
                        htmlFor="car-name-input"
                    >
                        Car Name
                        <input
                            className="input input-bordered mt-2 w-64 border-zinc-700 bg-zinc-950 text-white"
                            id="car-name-input"
                            maxLength={30}
                            placeholder="Nissan Skyline"
                            type="text"
                            value={carName}
                            onChange={event => {
                                setCarName(event.target.value)
                            }}
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="text-xs uppercase tracking-wide text-zinc-500"
                        htmlFor="car-color-input"
                    >
                        Color
                        <input
                            className="mt-2 h-12 w-16 cursor-pointer rounded border border-zinc-700 bg-transparent"
                            id="car-color-input"
                            type="color"
                            value={carColor}
                            onChange={event => {
                                setCarColor(event.target.value)
                            }}
                        />
                    </label>
                </div>

                <button
                    className="btn btn-primary"
                    disabled={!carName.trim()}
                    onClick={handleCreateClick}
                    type="button"
                >
                    Create Car
                </button>

                <button
                    className="btn btn-outline btn-warning"
                    type="button"
                    onClick={() => {
                        handleGenerateCars().catch(() => undefined)
                    }}
                >
                    Generate 100 Cars
                </button>
            </div>
        </section>
    )
}

export default GarageActions
