import {configureStore, combineReducers} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {LoginTokenSlice} from "./features/Slices/LoginSlice";



const rootReducer = combineReducers({
  LoginTokenSlice:LoginTokenSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ["HeaderScroll", "ModalReducer", "AddToCartReducer", "BlogReducer", "PortfolioReducer",
    "AllGridReducer", "ProductFilter", "CommonReducer", "CurrencyReducer", "CompareReducer", "ThemeCustomizerReducer"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
export const persistor = persistStore(store)
// export default the store
export default store

// export const store = configureStore({
//     reducer: {
//         HeaderScroll, ModalReducer, AddToCartReducer, BlogReducer, PortfolioReducer,
//         AllGridReducer, ProductFilter, CommonReducer, CurrencyReducer, CompareReducer, ThemeCustomizerReducer
//     }
// })