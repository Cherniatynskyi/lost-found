import { createSlice } from "@reduxjs/toolkit";

export const MenuSlice = createSlice({
    name: 'menu',
    initialState: {
        createModalIsOpen: false,
        burgerIsOpen: false,
        profileIsOpen: false,
    },
    reducers:{
        openCreateModal: (state, {payload}) =>{
            state.createModalIsOpen = true
        },
        closeCreateModal: (state, action) =>{
            state.createModalIsOpen = false

        },
        openBurger: (state, {payload}) =>{
            state.burgerIsOpen = true
            
        },
        closeBurger: (state, action) =>{
            state.burgerIsOpen = false
            
        },
        openProfile: (state, {payload}) =>{
            state.profileIsOpen = true
            
        },
        closeProfile: (state, action) =>{
            state.profileIsOpen = false
            
        },
    }
})



export const {openCreateModal, closeCreateModal, openBurger, closeBurger, openProfile, closeProfile, openDetails, closeDetails} = MenuSlice.actions