'use client'

import { useEffect, useState } from 'react'

import garageApi from '@/features/garage/api/garage.api'
import useGarageStore from '@/shared/store/garage.store'

const WinnerBanner = (): React.ReactElement | null => {
    const winner = useGarageStore(state => state.winner)
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        const load = async (): Promise<void> => {
            if (!winner) return

            const car = await garageApi.getCar(winner.id)

            if (mounted) {
                setName(car.name)
            }
        }

        load().catch(() => undefined)

        return () => {
            mounted = false
        }
    }, [winner])

    if (!winner || !name) return null

    return (
        <div className="fixed bottom-4 left-4 z-50 rounded bg-black px-4 py-3 text-white shadow-lg">
            🏁 Winner: <b>{name}</b> — {winner.time.toFixed(2)}s
        </div>
    )
}

export default WinnerBanner
