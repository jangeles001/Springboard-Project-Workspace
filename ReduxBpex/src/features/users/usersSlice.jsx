import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

const initialState = [];

// const initialState = [
//     {id: '1', name: 'Jesus'},
//     {id: '2', name: 'Tsun Zhu'}
// ]

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try{
        const response = await axios.get(USERS_URL);
        return [...response.data]; //can return raw data instead of putting in array
    }catch(error){
        return error.message;
    }
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { },
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload; //returns full payload to avoid adding users twice.
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer
