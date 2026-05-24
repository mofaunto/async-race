'use client'

import { create } from 'zustand'

import garageApi from '@/features/garage/api/garage.api'
import winnersApi from '@/features/winners/api/winners.api'

import type { Winner } from '@/features/winners/api/winners.api'

type SortField = 'id' | 'wins' | 'time'
type SortOrder = 'ASC' | 'DESC'

export interface WinnerWithCar extends Winner {
    name: string
    color: string
}

interface WinnersStore {
    winners: WinnerWithCar[]
    total: number
    page: number
    sort: SortField
    order: SortOrder
    isLoading: boolean

    setPage: (page: number) => void
    setSort: (sort: SortField) => void
    setOrder: (order: SortOrder) => void

    fetchWinners: () => Promise<void>
}

const useWinnersStore = create<WinnersStore>((set, get) => ({
    winners: [],
    total: 0,
    page: 1,
    sort: 'id',
    order: 'ASC',
    isLoading: false,

    setPage: page => {
        set({ page })
        get().fetchWinners()
    },
    setSort: sort => {
        set({ sort })
        get().fetchWinners()
    },
    setOrder: order => {
        set({ order })
        get().fetchWinners()
    },

    fetchWinners: async () => {
        set({ isLoading: true })

        try {
            const { page, sort, order } = get()

            const res = await winnersApi.getWinners({
                page,
                limit: 10,
                sort,
                order
            })

            const { items } = res

            const enriched = await Promise.all(
                items.map(async w => {
                    try {
                        const car = await garageApi.getCar(w.id)

                        return {
                            ...w,
                            name: car.name,
                            color: car.color
                        }
                    } catch {
                        return {
                            ...w,
                            name: 'Unknown car',
                            color: '#999'
                        }
                    }
                })
            )

            set({
                winners: enriched,
                total: res.total
            })
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useWinnersStore
