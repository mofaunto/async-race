'use client'

import useGarageStore from '@/shared/store/garage.store'

import CarFormModal from './car-form-modal'
import CarItem from './car-item'
import GarageControls from './garage-controls'

const GarageView = (): React.ReactElement => {
    const { cars } = useGarageStore()

    return (
        <div className="flex flex-col gap-4">
            <GarageControls />

            <ul className="flex flex-col gap-2">
                {cars.map(car => (
                    <CarItem key={car.id} car={car} />
                ))}
            </ul>

            <CarFormModal />
        </div>
    )
}

export default GarageView
