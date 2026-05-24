'use client'

import { useEffect } from 'react'

import useWinnersStore from '@/shared/store/winners.store'

const WinnersView = (): React.ReactElement => {
    const { winners, page, total, sort, order, setPage, fetchWinners } =
        useWinnersStore()

    useEffect(() => {
        fetchWinners()
    }, [page, sort, order, fetchWinners])

    const limit = 10
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Winners</h1>

            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="border-b">
                        <th>#</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Best time</th>
                    </tr>
                </thead>

                <tbody>
                    {winners.map((w, i) => (
                        <tr key={w.id} className="border-b">
                            <td>{(page - 1) * limit + i + 1}</td>

                            <td>
                                <div
                                    aria-label={`Car color ${w.color}`}
                                    className="h-4 w-8 rounded"
                                    role="img"
                                    style={{ backgroundColor: w.color }}
                                />
                            </td>

                            <td>{w.name}</td>
                            <td>{w.wins}</td>
                            <td>{w.time.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    type="button"
                >
                    Prev
                </button>

                <span className="px-2">
                    {page} / {totalPages || 1}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    type="button"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default WinnersView
