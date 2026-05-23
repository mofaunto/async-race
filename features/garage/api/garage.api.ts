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

const getCar = async (id: number): Promise<Car> => {
    const { data } = await apiClient.get<Car>(`/garage/${id}`)
    return data
}

const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
    const { data } = await apiClient.post<Car>('/garage', car)
    return data
}

const updateCar = async (id: number, car: Omit<Car, 'id'>): Promise<Car> => {
    const { data } = await apiClient.put<Car>(`/garage/${id}`, car)
    return data
}

const deleteCar = async (id: number): Promise<void> => {
    await apiClient.delete(`/garage/${id}`)
}

export default {
    getCars,
    getCar,
    createCar,
    updateCar,
    deleteCar
}
