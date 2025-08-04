import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import spaceTravelApi from "../../services/SpaceTravelApi";

const initialState = {
    planets:[],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    
};

export const fetchPlanets = createAsyncThunk('posts/fetchPlanets', async () => {
    try{
        const response = await spaceTravelApi.getPlanets()
        return response.data
    }catch (error) {
        return error.message;
    }
})

export const sendSpacecraftToPlanet = createAsyncThunk('spacecrafts/sendSpacecraftToPlanet', async ({spacecraftId, targetPlanetId}) => {
    
    try{
        const response = await spaceTravelApi.sendSpacecraftToPlanet({spacecraftId, targetPlanetId})
        return response.data
    }catch (error){
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder
        .addCase(fetchPlanets.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchPlanets.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.planets = action.payload
        })
        .addCase(fetchPlanets.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
         .addCase(sendSpacecraftToPlanet.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        .addCase(sendSpacecraftToPlanet.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const selectAllPlanets = (state) => state.planets.planets
export const getPlanetsStatus = (state) => state.planets.status;
export const getPlanetsError = (state) => state.planets.error;

export const { changePopulation } = planetsSlice.actions

export default planetsSlice.reducer