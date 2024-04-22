import { configureStore } from "@reduxjs/toolkit";
import { CardsSlice } from "./Cards/cardsSlice";
import { MenuSlice } from "./menuSlice";
import { authSlice } from "./Auth/authSlice";
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['token', 'tokenExpiration'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        cards: CardsSlice.reducer,
        menu: MenuSlice.reducer,
        auth: persistedAuthReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);