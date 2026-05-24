'use client'

import { useEffect, useState } from 'react'

import GarageView from '@/features/garage/ui/garage-view'
import AppShell from '@/features/layout/app-shell'
import Navigation from '@/features/layout/navigation'
import WinnersView from '@/features/winners/ui/winners-view'
import useGarageStore from '@/shared/store/garage.store'

type View = 'garage' | 'winners'

const Home = (): React.ReactElement => {
    const [view, setView] = useState<View>('garage')

    const { fetchCars } = useGarageStore()

    useEffect(() => {
        const loadCars = async (): Promise<void> => {
            await fetchCars()
        }

        loadCars().catch(() => undefined)
    }, [fetchCars])

    return (
        <AppShell>
            <Navigation activeView={view} onChange={setView} />

            {view === 'garage' ? <GarageView /> : <WinnersView />}
        </AppShell>
    )
}

export default Home
