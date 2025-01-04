import { createSlice } from '@reduxjs/toolkit';
import { ACCESS_TOKEN } from '../config';

const data = createSlice({
    name: 'data',
    initialState: {
        data: {is_login:localStorage.getItem(ACCESS_TOKEN) ? true : false},
    },
    reducers: {
        setData: (state, action) => {
        state.data = action.payload;
        },
    },
    });
export const dataActions = data.actions;
export default data;