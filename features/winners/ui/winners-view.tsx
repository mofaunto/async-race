import CarIcon from '@/shared/ui/car-icon'

const WinnersView = (): React.ReactElement => (
    <section className="flex flex-col gap-6">
        <div>
            <h2 className="text-3xl font-bold text-yellow-400">Winners</h2>

            <p className="text-zinc-400">Top race champions</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Car</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Best Time</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td
                            className="py-10 text-center text-zinc-500"
                            colSpan={5}
                        >
                            No winners yet
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
)

export default WinnersView
