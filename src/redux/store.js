import { configureStore } from "@reduxjs/toolkit";
import { CardsSlice } from "./cardsSlice";

export const store = configureStore({
    reducer: {
        cards: CardsSlice.reducer
    },
})