'use client'

import { useEffect, useState } from 'react'

import useGarageStore from '@/shared/store/garage.store'

const CarFormModal = (): React.ReactElement | null => {
    const { isModalOpen, closeModal, editingCar, createCar, updateCar } =
        useGarageStore()

    const [form, setForm] = useState({
        name: '',
        color: '#000000'
    })

    const isEdit = Boolean(editingCar)

    useEffect(() => {
        if (editingCar) {
            setForm({
                name: editingCar.name,
                color: editingCar.color
            })
        } else {
            setForm({
                name: '',
                color: '#000000'
            })
        }
    }, [editingCar])

    if (!isModalOpen) return null

    const handleSubmit = async (): Promise<void> => {
        if (!form.name.trim()) return

        if (isEdit && editingCar) {
            await updateCar(editingCar.id, {
                name: form.name,
                color: form.color
            })
        } else {
            await createCar({
                name: form.name,
                color: form.color
            })
        }

        closeModal()
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    {isEdit ? 'Edit Car' : 'Create Car'}
                </h3>

                <div className="flex flex-col gap-3 mt-4">
                    <input
                        value={form.name}
                        onChange={e =>
                            setForm(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }
                    />

                    <input
                        type="color"
                        value={form.color}
                        onChange={e =>
                            setForm(prev => ({
                                ...prev,
                                color: e.target.value
                            }))
                        }
                    />
                </div>

                <div className="modal-action">
                    <button className="btn" onClick={closeModal} type="button">
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        type="button"
                    >
                        {isEdit ? 'Update' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CarFormModal
