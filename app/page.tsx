'use client'

import { useEffect } from 'react'

import GarageView from '@/features/garage/ui/garage-view'
import useGarageStore from '@/shared/store/garage.store'

const Home = (): React.ReactElement => {
    const { fetchCars } = useGarageStore()

    useEffect(() => {
        const loadCars = async (): Promise<void> => {
            await fetchCars()
        }

        loadCars().catch(() => undefined)
    }, [fetchCars])

    const handleRefetch = async (): Promise<void> => {
        try {
            await fetchCars()
        } catch {
            console.log('Failed to refetch cars')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col gap-4 rounded-xl bg-white p-8 dark:bg-zinc-900">
                <h1 className="text-3xl font-bold">Async Race</h1>

                <GarageView />

                <button
                    className="btn btn-success w-fit"
                    onClick={handleRefetch}
                    type="button"
                >
                    Refetch
                </button>
            </main>
        </div>
    )
}

export default Home
