'use client'

import useGarageStore from '@/shared/store/garage.store'
import CarIcon from '@/shared/ui/car-icon'

import type { Car } from '@/shared/types/car'

interface Props {
    car: Car
}

const RaceLane = ({ car }: Props): React.ReactElement => {
    const { openEditModal, deleteCar, runCarRace } = useGarageStore()

    const handleDelete = async (): Promise<void> => {
        await deleteCar(car.id)
    }

    const handleStart = async (): Promise<void> => {
        const element = document.querySelector<HTMLElement>(
            `[data-car-id="${car.id}"]`
        )

        if (!element) return

        const lane = element.closest('[data-lane]')
        const finishLine = lane?.clientWidth ?? 300

        try {
            await runCarRace(car.id, element, finishLine)
        } catch {
            // ignore
        }
    }

    const handleStop = async (): Promise<void> => {
        const element = document.querySelector<HTMLElement>(
            `[data-car-id="${car.id}"]`
        )

        if (!element) return

        element.style.transform = 'translateX(0px)'
    }

    return (
        <div
            data-lane
            className="relative border-b border-dashed border-zinc-700 px-3 py-4 sm:px-4"
        >
            <div className="mb-4 flex flex-wrap items-center gap-2">
                <button
                    className="btn btn-xs btn-success sm:btn-sm"
                    type="button"
                    onClick={() => {
                        handleStart().catch(() => undefined)
                    }}
                >
                    Start
                </button>

                <button
                    className="btn btn-xs btn-warning sm:btn-sm"
                    type="button"
                    onClick={() => {
                        handleStop().catch(() => undefined)
                    }}
                >
                    Stop
                </button>

                <button
                    className="btn btn-xs btn-info sm:btn-sm"
                    onClick={() => openEditModal(car)}
                    type="button"
                >
                    Select
                </button>

                <button
                    className="btn btn-xs btn-error sm:btn-sm"
                    type="button"
                    onClick={() => {
                        handleDelete().catch(() => undefined)
                    }}
                >
                    Delete
                </button>

                <span className="min-w-0 truncate text-sm font-semibold text-zinc-200 sm:text-base">
                    {car.name}
                </span>
            </div>

            <div className="relative h-16 sm:h-20 md:h-24">
                {/* road */}
                <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-zinc-700" />

                {/* car */}
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 transition-transform"
                    data-car-id={car.id}
                >
                    <CarIcon color={car.color} />
                </div>

                {/* finish line */}
                <div className="absolute right-2 top-0 flex h-full items-center sm:right-6 md:right-10">
                    <div className="h-full w-2 bg-linear-to-b from-white via-zinc-300 to-white sm:w-3" />
                </div>
            </div>
        </div>
    )
}

export default RaceLane
