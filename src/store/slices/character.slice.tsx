import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {ICharacter} from "../../interfaces/ICharacter";
import {characterService} from "../../services/character.service";


export interface CharacterState {
    charactersArr: {};
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: any;
}


export const getAllCharacters = createAsyncThunk<ICharacter[], void, { rejectValue: string }>(
    'characterSlice/getAllCharacters',
    async (_, {rejectWithValue}): Promise<any> => {
        try {
            const charactersA = await characterService.getAll();
            console.log(charactersA);
            return charactersA;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);


const initialState: CharacterState = {
    charactersArr: [],
    status: 'idle',
    error: '',
};

const characterSlice = createSlice({
    name: 'characterSlice',

    initialState,

    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(getAllCharacters.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllCharacters.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.charactersArr = action.payload;
            })
            .addCase(getAllCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

export default characterSlice.reducer;