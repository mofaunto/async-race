'use client'

import { create } from 'zustand'

import getCars from '@/features/garage/api/garage.api'

import type { Car } from '@/shared/types/car'

interface GarageStore {
    cars: Car[]
    totalCars: number
    page: number
    isLoading: boolean

    fetchCars: () => Promise<void>
    setPage: (page: number) => void
}

const useGarageStore = create<GarageStore>((set, get) => ({
    cars: [],
    totalCars: 0,
    page: 1,
    isLoading: false,

    setPage: page => set({ page }),

    fetchCars: async () => {
        set({ isLoading: true })

        try {
            const { items, total } = await getCars({
                page: get().page
            })

            set({
                cars: items,
                totalCars: total
            })
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useGarageStore
