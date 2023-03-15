import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loadingSlice from "./slices/loadingSlice";
import productsSlice from "./slices/productsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const secretKey = process.env.REACT_APP_redux_secret || "secret";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  transforms: [
    encryptTransform({
      secretKey: secretKey,
      onError: function (error) {
        console.error(error);
      },
    }),
  ],
};

const reducer = combineReducers({
  products: productsSlice,
  loading: loadingSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
