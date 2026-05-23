import apiClient from '@/shared/api/client'

import type { Car } from '@/shared/types/car'

interface GetCarsParams {
    page?: number
    limit?: number
}

interface GetCarsResponse {
    items: Car[]
    total: number
}

const getCars = async ({
    page = 1,
    limit = 7
}: GetCarsParams): Promise<GetCarsResponse> => {
    const response = await apiClient.get<Car[]>('/garage', {
        params: {
            _page: page,
            _limit: limit
        }
    })

    return {
        items: response.data,
        total: Number(response.headers['x-total-count'] ?? 0)
    }
}

export default getCars
