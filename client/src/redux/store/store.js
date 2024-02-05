import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice.js";
import userReducer from "../slice/userSlice.js";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ cart: cartReducer, user: userReducer });

// Persisting Reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);

//Why we using react-persist
/*
working with React, Redux, Context API, and Mobx. Using something like Redux, Context, or Mobx makes it so you can keep state after re-rendering components. That is completely different from refreshing the page. When a state changes, its component re-renders. When the browser refreshes, all states are reset
*/
