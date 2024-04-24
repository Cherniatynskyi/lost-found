import axios from 'axios'
import { setToken } from './authService'
import { instance } from './authService'

export const getLost = async () => {
    const response = await axios({ url: `http://localhost:3003/api/cards/lost`, method: "GET" })
    return response.data
}

export const getFound = async () => {
    const response = await axios({ url: `http://localhost:3003/api/cards/found`, method: "GET" })
    return response.data
}

export const getByOwner = async (ownerId) => {
    const {data} = await instance.get(`cards/${ownerId}`)
    setToken(`Bearer ${data.token}`)
    return data
}

export const addCard = async (data) => {
    return await axios.post('http://localhost:3003/api/cards/', data) 
}

export const deleteCard = async (id) => {
    return await axios.delete(`http://localhost:3003/api/cards/${id}`)
}

export const updateCard = async (id, data) => {
    return await axios.put(`http://localhost:3003/api/cards/${id}`, data)
}