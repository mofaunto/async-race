'use client'

import { useEffect, useState } from 'react'

import GarageView from '@/features/garage/ui/garage-view'
import WinnersView from '@/features/winners/ui/winners-view'
import useGarageStore from '@/shared/store/garage.store'

type View = 'garage' | 'winners'

const Home = (): React.ReactElement => {
    const [activeView, setActiveView] = useState<View>('garage')

    const { fetchCars } = useGarageStore()

    useEffect(() => {
        const loadCars = async (): Promise<void> => {
            await fetchCars()
        }

        loadCars().catch(() => undefined)
    }, [fetchCars])

    return (
        <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
            <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-xl bg-white p-8 dark:bg-zinc-900">
                <h1 className="text-3xl font-bold">Async Race</h1>

                <div className="flex gap-3">
                    <button
                        onClick={() => setActiveView('garage')}
                        type="button"
                        className={`btn ${
                            activeView === 'garage'
                                ? 'btn-primary'
                                : 'btn-outline'
                        }`}
                    >
                        Garage
                    </button>

                    <button
                        onClick={() => setActiveView('winners')}
                        type="button"
                        className={`btn ${
                            activeView === 'winners'
                                ? 'btn-primary'
                                : 'btn-outline'
                        }`}
                    >
                        Champions
                    </button>
                </div>

                {activeView === 'garage' ? <GarageView /> : <WinnersView />}
            </main>
        </div>
    )
}

export default Home
