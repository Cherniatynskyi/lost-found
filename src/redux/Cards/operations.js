import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLost, getFound, getByOwner, addCard, deleteCard, updateCard } from "services/l&fApi";

export const getLostThunk = createAsyncThunk('cards/getLost', async({page, location, category})=>{
    return await getLost(page, location, category)
})

export const getFoundThunk = createAsyncThunk('cards/getFound', async({page, location, category})=>{
    return await getFound(page, location, category)
})

export const getByOwnerThunk = createAsyncThunk('cards/getByOwner', async(ownerId, thunkAPI)=>{
    const state = thunkAPI.getState();
    const persostedToken = state.auth.token;
    return await getByOwner(ownerId, persostedToken)
})

export const addCardThunk = createAsyncThunk('cards/addCard', async(data)=>{
    const cards = await addCard(data);
    toast.success('Публікація створенна');
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