'use client'

import useGarageStore from '@/shared/store/garage.store'

const GarageControls = (): React.ReactElement => {
    const { openCreateModal } = useGarageStore()

    return (
        <div className="flex gap-2">
            <button
                className="btn btn-primary"
                onClick={openCreateModal}
                type="button"
            >
                Create car
            </button>
        </div>
    )
}

export default GarageControls
