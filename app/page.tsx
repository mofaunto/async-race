'use client'

import { useEffect } from 'react'

import useGarageStore from '@/shared/store/garage.store'

const Home = (): React.ReactElement => {
    const { cars, totalCars, isLoading, fetchCars } = useGarageStore()

    useEffect(() => {
        const loadCars = async (): Promise<void> => {
            await fetchCars()
        }

        loadCars().catch((error: Error) => {
            console.error(error)
        })
    }, [fetchCars])

    const handleRefetch = async (): Promise<void> => {
        try {
            await fetchCars()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-8 dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col gap-4 rounded-xl bg-white p-8 dark:bg-zinc-900">
                <h1 className="text-3xl font-bold">Async Race</h1>

                <p>Total cars: {totalCars}</p>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {cars.map(car => (
                            <li key={car.id} className="rounded border p-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="h-4 w-4 rounded-full"
                                        style={{
                                            backgroundColor: car.color
                                        }}
                                    />

                                    <span>{car.name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

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
