import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import spaceTravelApi from '../../services/SpaceTravelApi.js'

const POSTS_URL= '';

const initialState = {
    spacecrafts:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,

    selectedSpacecraft: {
    data: null,
    status: 'idle',
    error: null
}
};

export const fetchSpacecrafts = createAsyncThunk('spacecrafts/fetchSpacecrafts', async () => {
    try{
        const response = await spaceTravelApi.getSpacecrafts();
        return response.data
    }catch (error) {
        return error.message;
    }
})

export const buildSpacecraft = createAsyncThunk('spacecrafts/buildSpacecraft', async (initialSpacecraft) => {

    const {craftName: name, capacity, description, pictureUrl } = initialSpacecraft;

    try{
        const response = await spaceTravelApi.buildSpacecraft({ name, capacity, description, pictureUrl })
        return response.data
    }catch (error){
        return error.message;
    }
})

export const destroySpacecraft = createAsyncThunk('spacecrafts/destroySpacecraft', async (spacecraftId) => {
    try{
        const response = await spaceTravelApi.destroySpacecraftById({ id: spacecraftId })

        return response.data
    }catch (error){
        return error.message
    }
})

export const getSpacecraftById = createAsyncThunk('spacecrafts/getSpacecraftById', async (spacecraftId) => {
    try{
        const response = await spaceTravelApi.getSpacecraftById({id: spacecraftId})
        return response.data
    }catch (error){
        return error.message
    }
})

export const SpacecraftsSlice = createSlice({
    name: 'spacecrafts',
    initialState,
    reducers: {   
    },
    extraReducers(builder){
        builder
        .addCase(fetchSpacecrafts.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchSpacecrafts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.spacecrafts = action.payload
        })
        .addCase(fetchSpacecrafts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(buildSpacecraft.fulfilled, (state) => {
            state.status = 'succeeded'
        })
        .addCase(destroySpacecraft.fulfilled, (state, action) => {
            const id = action.meta.arg; // spacecraftId passed into the thunk
            state.spacecrafts = state.spacecrafts.filter(spacecraft => spacecraft.id !== id);
        })
        .addCase(getSpacecraftById.pending, (state) => {
            state.selectedSpacecraft.status = 'loading';
            state.selectedSpacecraft.data = null;
            state.selectedSpacecraft.error = null;
        })
        .addCase(getSpacecraftById.fulfilled, (state, action) => {
            state.selectedSpacecraft.status = 'succeeded';
            state.selectedSpacecraft.data = action.payload;
        })
        .addCase(getSpacecraftById.rejected, (state, action) => {
            state.selectedSpacecraft.status = 'failed';
            state.selectedSpacecraft.error = action.error.message;
        })
    }
})

export const selectAllSpacecrafts = (state) => state.spacecrafts.spacecrafts
export const getSpacecraftsStatus = (state) => state.spacecrafts.status
export const getSpacecraftsError = (state) => state.spacecrafts.error
export const selectSelectedSpacecraft = (state) => state.spacecrafts.selectedSpacecraft;

export default SpacecraftsSlice.reducer