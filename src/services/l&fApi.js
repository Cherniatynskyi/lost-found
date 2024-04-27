import axios from 'axios'
import { setToken, instance } from './authService'

export const getLost = async (page, location, category) => {
    const response = await axios({ url: `http://localhost:3003/api/cards/lost?page=${page}&location=${location}&category=${category}`, method: "GET" })
    return response.data
}

export const getFound = async (page, location, category) => {
    console.log(location, category)
    const response = await axios({ url: `http://localhost:3003/api/cards/found?page=${page}&location=${location}&category=${category}`, method: "GET" })
    return response.data
}

export const getByOwner = async (ownerId, token) => {
    setToken(`Bearer ${token}`) 
    const {data} = await instance.get(`cards/${ownerId}`)
    return data
}

export const addCard = async (body) => {
    const {data} =  await instance.post('cards/', body)
    setToken(`Bearer ${data.token}`) 
    return data
}

export const deleteCard = async (id) => {
    const {data} = await instance.delete(`cards/${id}`)
    setToken(`Bearer ${data.token}`) 
    return data
}

export const updateCard = async (id, data) => {
    return await axios.put(`http://localhost:3003/api/cards/${id}`, data)
}