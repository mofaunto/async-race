import apiClient from '@/shared/api/client'

export interface Winner {
    id: number
    wins: number
    time: number
}

export interface WinnerWithCar extends Winner {
    name: string
    color: string
}

const getWinners = async (params: {
    page: number
    limit: number
    sort: 'id' | 'wins' | 'time'
    order: 'ASC' | 'DESC'
}): Promise<{ items: Winner[]; total: number }> => {
    const response = await apiClient.get<Winner[]>('/winners', {
        params: {
            _page: params.page,
            _limit: params.limit,
            _sort: params.sort,
            _order: params.order
        }
    })

    return {
        items: response.data,
        total: Number(response.headers['x-total-count'] ?? 0)
    }
}

const getWinner = async (id: number): Promise<Winner | null> => {
    try {
        const { data } = await apiClient.get<Winner>(`/winners/${id}`)
        return data
    } catch {
        return null
    }
}

const createWinner = async (winner: Winner): Promise<void> => {
    await apiClient.post('/winners', winner)
}

const updateWinner = async (
    id: number,
    winner: Omit<Winner, 'id'>
): Promise<void> => {
    await apiClient.put(`/winners/${id}`, winner)
}

export default {
    getWinners,
    getWinner,
    createWinner,
    updateWinner
}
