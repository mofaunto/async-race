'use client'

import { create } from 'zustand'

import garageApi from '@/features/garage/api/garage.api'

import type { Car } from '@/shared/types/car'

interface GarageStore {
    cars: Car[]
    totalCars: number
    page: number
    isLoading: boolean

    editingCar: Car | null
    isModalOpen: boolean

    fetchCars: () => Promise<void>
    setPage: (page: number) => void

    openCreateModal: () => void
    openEditModal: (car: Car) => void
    closeModal: () => void

    createCar: (car: Omit<Car, 'id'>) => Promise<void>
    updateCar: (id: number, car: Omit<Car, 'id'>) => Promise<void>
    deleteCar: (id: number) => Promise<void>
}

const useGarageStore = create<GarageStore>((set, get) => ({
    cars: [],
    totalCars: 0,
    page: 1,
    isLoading: false,

    editingCar: null,
    isModalOpen: false,

    openCreateModal: () => set({ isModalOpen: true, editingCar: null }),

    openEditModal: car => set({ isModalOpen: true, editingCar: car }),

    closeModal: () => set({ isModalOpen: false, editingCar: null }),

    setPage: page => set({ page }),

    fetchCars: async () => {
        set({ isLoading: true })

        try {
            const { items, total } = await garageApi.getCars({
                page: get().page
            })

            set({
                cars: items,
                totalCars: total
            })
        } finally {
            set({ isLoading: false })
        }
    },

    createCar: async car => {
        await garageApi.createCar(car)
        await get().fetchCars()
    },

    updateCar: async (id, car) => {
        await garageApi.updateCar(id, car)
        await get().fetchCars()
    },

    deleteCar: async id => {
        await garageApi.deleteCar(id)
        await get().fetchCars()
    }
}))

export default useGarageStore
