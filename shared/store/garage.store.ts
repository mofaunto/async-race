'use client'

import { create } from 'zustand'

import garageApi from '@/features/garage/api/garage.api'
import winnersApi from '@/features/winners/api/winners.api'
import apiClient from '@/shared/api/client'
import useWinnersStore from '@/shared/store/winners.store'

import type { Car } from '@/shared/types/car'

type RaceStatus = 'idle' | 'running' | 'finished'

interface Winner {
    id: number
    time: number
    name?: string
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
            { params: { id, status: 'started' } }
        )
        return data
    },

    drive: async (id: number): Promise<{ success: true }> => {
        const { data } = await apiClient.patch<{ success: true }>(
            '/engine',
            null,
            { params: { id, status: 'drive' } }
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
    document.querySelector(`[data-car-id="${id}"]`)

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
    winnerBanner: boolean

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
    winnerBanner: false,

    openCreateModal: () => set({ isModalOpen: true, editingCar: null }),

    openEditModal: (car: Car) => set({ isModalOpen: true, editingCar: car }),

    closeModal: () => set({ isModalOpen: false, editingCar: null }),

    setPage: (page: number) => set({ page }),

    fetchCars: async () => {
        set({ isLoading: true })
        try {
            const res = await garageApi.getCars({
                page: get().page
            })

            set({
                cars: res.items,
                totalCars: res.total
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
    },

    runCarRace: async (id, element, finishLine) => {
        const { start, drive } = engineApi

        const { velocity, distance } = await start(id)
        const duration = distance / velocity

        let startTime: number | null = null
        let frameId: number

        const animate = (t: number): void => {
            startTime = startTime ?? t
            const progress = Math.min((t - startTime) / duration, 1)

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
        } catch {
            cancelAnimationFrame(frameId)
            applyTransform(element, 'translateX(0px)')
            throw new Error('Car failed during race')
        }
    },

    startRace: async () => {
        const { cars } = get()

        if (get().raceStatus === 'running') return

        set({
            raceStatus: 'running',
            winner: null,
            winnerBanner: false
        })

        let winnerLocked = false

        const racePromises = cars.map(async car => {
            const el = getCarElement(car.id)
            if (!el) return

            const finish = el.parentElement?.clientWidth ?? 300

            try {
                const time = await get().runCarRace(car.id, el, finish)

                if (!winnerLocked) {
                    winnerLocked = true

                    const winner = { id: car.id, time }

                    set({
                        winner,
                        winnerBanner: true
                    })

                    setTimeout(() => {
                        set({ winnerBanner: false })
                    }, 3000)

                    const existing = await winnersApi.getWinner(winner.id)

                    if (existing) {
                        await winnersApi.updateWinner(winner.id, {
                            wins: existing.wins + 1,
                            time: Math.min(existing.time, winner.time)
                        })
                    } else {
                        await winnersApi.createWinner({
                            id: winner.id,
                            wins: 1,
                            time: winner.time
                        })
                    }

                    await useWinnersStore.getState().fetchWinners()
                }
            } catch {
                // engine failure ignored
            }
        })

        await Promise.allSettled(racePromises)

        set({ raceStatus: 'finished' })
    },

    resetRace: () => {
        get().cars.forEach(car => {
            const el = getCarElement(car.id)
            if (el) {
                applyTransform(el, 'translateX(0px)')
            }
        })

        set({ raceStatus: 'idle', winner: null })
    }
}))

export default useGarageStore
