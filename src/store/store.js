import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from './auth.js'
import postReducer from './post.js'
import { persistReducer, persistStore } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: 
        persistedReducer
    
})

export const persistor = persistStore(store)