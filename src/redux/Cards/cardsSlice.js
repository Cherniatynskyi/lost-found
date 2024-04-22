import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import { getLostThunk, getFoundThunk, getByOwnerThunk, addCardThunk, deleteCardThunk, updateCardThunk } from "./operations";

const handlePending = (state) => {
    state.isLoading = true
}

const handleFulfilledGetLost = (state,{payload}) => {
    state.isLoading = false
    state.cards = payload
    state.error = ''
}

const handleFulfilledGetFound = (state,{payload}) => {
    state.isLoading = false
    state.cards = payload
    state.error = ''
}

const handleFulfilledGetByOwner = (state,{payload}) => {
    state.isLoading = false
    state.cards = payload
    state.error = ''
}

const handleFulfilledAdd = (state, action) => {
    state.isLoading = false
    state.cards.push(action.payload)
    state.error = ''
}

const handleFulfilledDel = (state,{payload}) => {
    state.isLoading = false
    state.cards = state.cards.filter(el=>el.id!==payload?.id)
    state.error = ''
}

const handleFulfilledUpd = (state,{payload}) => {
    state.isLoading = false
    state.cards = state.cards.map(card =>
        card.id === payload.id ? { ...card, ...payload } : card
      );
}


const handleRejected = (state,{payload}) => {
    state.error = payload
    state.isLoading = false
    console.log('error')
}

export const CardsSlice = createSlice({
    name: 'cards',
    initialState: {
        cards:[],
        type: 'lost',
        isLoading: false,
        error: '',
        filters: {}
    },
    reducers:{
        setFilter: (state, {payload})=>{
            state.filters = payload
        },
        setType: (state, {payload})=>{
            state.type = payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getLostThunk.fulfilled, handleFulfilledGetLost)
        .addCase(getFoundThunk.fulfilled, handleFulfilledGetFound)
        .addCase(getByOwnerThunk.fulfilled, handleFulfilledGetByOwner)
        .addCase(addCardThunk.fulfilled, handleFulfilledAdd)
        .addCase(deleteCardThunk.fulfilled, handleFulfilledDel)
        .addCase(updateCardThunk.fulfilled, handleFulfilledUpd)
        .addMatcher(isAnyOf(getLostThunk.pending, getFoundThunk.pending, getByOwnerThunk.pending, addCardThunk.pending, deleteCardThunk.pending, updateCardThunk.pending), handlePending)
        .addMatcher(isAnyOf(getLostThunk.rejected, getFoundThunk.rejected, getByOwnerThunk.rejected, addCardThunk.rejected, deleteCardThunk.rejected, updateCardThunk.rejected), handleRejected)
    }
})

export const {setFilter, setType} = CardsSlice.actions