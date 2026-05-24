import useGarageStore from '@/shared/store/garage.store'

const GaragePagination = (): React.ReactElement => {
    const { page, totalCars, setPage } = useGarageStore()

    const limit = 7
    const totalPages = Math.ceil(totalCars / limit)

    return (
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
    )
}

export default GaragePagination
