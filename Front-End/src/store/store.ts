import { configureStore } from "@reduxjs/toolkit";
import data from "./data";


const store = configureStore({
    reducer: {
        data: data.reducer,
    },
});

export default store;