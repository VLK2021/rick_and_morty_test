import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {characterService} from "../../services/character.service";
import IData from "../../interfaces/IData";
import {ICharacter} from "../../interfaces/ICharacter";


interface IPage {
    page: number; // Визначаємо тип параметру "page"
}

export const getAllCharacters: any = createAsyncThunk<IData, IPage, { rejectValue: string }>(
    'characterSlice/getAllCharacters',
    async ({page}, {rejectWithValue}): Promise<any> => {
        try {
            const dataA = await characterService.getAll(page);
            return dataA;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export interface CharacterState {
    info: {};
    results: ICharacter[];
    count: number;
    pages: number;
    page: number;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: any;
}


const initialState: CharacterState = {
    info: {},
    results: [],
    count: 0,
    pages: 0,
    page: 1,
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
                state.results = action.payload.results;
                state.info = action.payload.info;
                state.count = action.payload.info.count;
                state.pages = action.payload.info.pages;
            })
            .addCase(getAllCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

export default characterSlice.reducer;


