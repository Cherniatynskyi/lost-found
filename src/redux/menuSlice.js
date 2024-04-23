import { createSlice } from "@reduxjs/toolkit";

export const MenuSlice = createSlice({
    name: 'menu',
    initialState: {
        isOpen: false,
        burgerIsOpen: false,
        profileIsOpen: false
    },
    reducers:{
        openModal: (state, {payload}) =>{
            state.isOpen = true
            state.modalContent = payload.content
            state.selectedElId = payload.id
        },
        closeModal: (state, action) =>{
            state.isOpen = false
            state.modalContent = null
            state.selectedElId = null
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
            
        }
    }
})



export const {openModal, closeModal, openBurger, closeBurger, openProfile, closeProfile} = MenuSlice.actions