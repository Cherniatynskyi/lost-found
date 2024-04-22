import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLost, getFound, getByOwner, addCard, deleteCard, updateCard } from "services/l&fApi";

export const getLostThunk = createAsyncThunk('cards/getLost', async()=>{
    return await getLost()
})

export const getFoundThunk = createAsyncThunk('cards/getFound', async()=>{
    return await getFound()
})

export const getByOwnerThunk = createAsyncThunk('cards/getByOwner', async(ownerId)=>{
    return await getByOwner(ownerId)
})

export const addCardThunk = createAsyncThunk('cards/addCard', async(data)=>{
    const cards = await addCard(data);
    return cards.data
})

export const deleteCardThunk = createAsyncThunk('cards/deleteCard', async(id)=>{
    const cards = await deleteCard(id);
    return cards.data
})

export const updateCardThunk = createAsyncThunk('cards/updateCard', async({id, body})=>{
    const cards = await updateCard(id, body);
    return cards.data
})