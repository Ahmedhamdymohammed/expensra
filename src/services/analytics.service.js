import api from './axios'

export const analytics = async ()=> {
    const request = await api.get("/api/transactions/last-six-months")
    return request.data
}