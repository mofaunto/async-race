'use client'

import { create } from 'zustand'

import garageApi from '@/features/garage/api/garage.api'
import apiClient from '@/shared/api/client'

import type { Car } from '@/shared/types/car'

type RaceStatus = 'idle' | 'running' | 'finished'

interface Winner {
    id: number
    time: number
}

interface EngineStartResponse {
    velocity: number
    distance: number
}

const engineApi = {
    start: async (id: number): Promise<EngineStartResponse> => {
        const { data } = await apiClient.patch<EngineStartResponse>(
            '/engine',
            null,
            {
                params: { id, status: 'started' }
            }
        )

        return data
    },

    drive: async (id: number): Promise<{ success: true }> => {
        const { data } = await apiClient.patch<{ success: true }>(
            '/engine',
            null,
            {
                params: { id, status: 'drive' }
            }
        )

        return data
    },

    stop: async (id: number): Promise<void> => {
        await apiClient.patch('/engine', null, {
            params: { id, status: 'stopped' }
        })
    }
}

const getCarElement = (id: number): HTMLElement | null =>
    document.querySelector<HTMLElement>(`[data-car-id="${id}"]`)

const applyTransform = (element: HTMLElement, value: string): void => {
    const el = element
    el.style.transform = value
}

interface GarageStore {
    cars: Car[]
    totalCars: number
    page: number
    isLoading: boolean

    editingCar: Car | null
    isModalOpen: boolean

    raceStatus: RaceStatus
    winner: Winner | null

    fetchCars: () => Promise<void>
    setPage: (page: number) => void

    openCreateModal: () => void
    openEditModal: (car: Car) => void
    closeModal: () => void

    createCar: (car: Omit<Car, 'id'>) => Promise<void>
    updateCar: (id: number, car: Omit<Car, 'id'>) => Promise<void>
    deleteCar: (id: number) => Promise<void>

    runCarRace: (
        id: number,
        element: HTMLElement,
        finishLine: number
    ) => Promise<number>

    startRace: () => Promise<void>
    resetRace: () => void
}

const useGarageStore = create<GarageStore>((set, get) => ({
    cars: [],
    totalCars: 0,
    page: 1,
    isLoading: false,

    editingCar: null,
    isModalOpen: false,

    raceStatus: 'idle',
    winner: null,

    openCreateModal: () => set({ isModalOpen: true, editingCar: null }),

    openEditModal: (car: Car) => set({ isModalOpen: true, editingCar: car }),

    closeModal: () => set({ isModalOpen: false, editingCar: null }),

    setPage: (page: number) => set({ page }),

    fetchCars: async () => {
        set({ isLoading: true })

        try {
            const { items, total } = await garageApi.getCars({
                page: get().page
            })

            set({ cars: items, totalCars: total })
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
    },

    runCarRace: async (id, element, finishLine) => {
        const { start, drive } = engineApi

        const { velocity, distance } = await start(id)

        const duration = distance / velocity

        let startTime: number | null = null
        let frameId: number

        const animate = (timestamp: number): void => {
            startTime = startTime ?? timestamp

            const progress = Math.min((timestamp - startTime) / duration, 1)

            const position = progress * finishLine

            applyTransform(element, `translateX(${position}px)`)

            if (progress < 1) {
                frameId = requestAnimationFrame(animate)
            }
        }

        frameId = requestAnimationFrame(animate)

        try {
            await drive(id)

            cancelAnimationFrame(frameId)

            return duration
        } catch (error) {
            cancelAnimationFrame(frameId)

            applyTransform(element, 'translateX(0px)')

            throw error
        }
    },

    startRace: async () => {
        const { cars } = get()

        if (get().raceStatus === 'running') return

        set({ raceStatus: 'running', winner: null })

        let winnerFound = false

        await Promise.all(
            cars.map(async car => {
                const element = getCarElement(car.id)

                if (!element) return

                const finishLine = element.parentElement?.clientWidth ?? 300

                try {
                    const time = await get().runCarRace(
                        car.id,
                        element,
                        finishLine
                    )

                    if (!winnerFound) {
                        winnerFound = true

                        set({
                            winner: {
                                id: car.id,
                                time: Number(time.toFixed(2))
                            }
                        })
                    }
                } catch {
                    // ignore failure
                }
            })
        )

        set({ raceStatus: 'finished' })
    },

    resetRace: () => {
        const { cars } = get()

        cars.forEach(car => {
            const element = getCarElement(car.id)

            if (!element) return

            applyTransform(element, 'translateX(0px)')
        })

        set({
            raceStatus: 'idle',
            winner: null
        })
    }
}))

export default useGarageStore
