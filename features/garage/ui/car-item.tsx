'use client'

import useGarageStore from '@/shared/store/garage.store'

import type { Car } from '@/shared/types/car'

interface Props {
    car: Car
}

const CarItem = ({ car }: Props): React.ReactElement => {
    const { openEditModal, deleteCar } = useGarageStore()

    const handleDelete = async (): Promise<void> => {
        await deleteCar(car.id)
    }

    return (
        <li className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-3">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: car.color }}
                />

                <span>{car.name}</span>
            </div>

            <div className="flex gap-2">
                <button
                    className="btn btn-sm"
                    onClick={() => openEditModal(car)}
                    type="button"
                >
                    Edit
                </button>

                <button
                    className="btn btn-sm btn-error"
                    onClick={handleDelete}
                    type="button"
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default CarItem
