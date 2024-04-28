import axios from 'axios'
import { setToken, instance } from './authService'

export const getLost = async (page, location, category) => {
    const response = await axios({ url: `https://lost-found-server.onrender.com/api/cards/lost?page=${page}&location=${location}&category=${category}`, method: "GET" })
    return response.data
}

export const getFound = async (page, location, category) => {
    const response = await axios({ url: `https://lost-found-server.onrender.com/api/cards/found?page=${page}&location=${location}&category=${category}`, method: "GET" })
    return response.data
}

export const getByOwner = async (ownerId) => {
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

export const updateCard = async (id, body) => {
    const {data} =  await instance.put(`cards/${id}`, body)
    setToken(`Bearer ${data.token}`) 
    return data
}