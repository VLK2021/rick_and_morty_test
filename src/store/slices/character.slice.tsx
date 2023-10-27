import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {characterService} from "../../services/character.service";
import IData from "../../interfaces/IData";
import {ICharacter} from "../../interfaces/ICharacter";


export const getAllCharacters: any = createAsyncThunk<IData, void, { rejectValue: string }>(
    'characterSlice/getAllCharacters',
    async (_, {rejectWithValue}): Promise<any> => {
        try {
            const dataA = await characterService.getAll();
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
    next: string | null;
    prev: string | null;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: any;
}


const initialState: CharacterState = {
    info: {},
    results: [],
    count: 0,
    pages: 0,
    next: '',
    prev: '',
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
                state.next = action.payload.info.next;
                state.prev = action.payload.info.prev;
            })
            .addCase(getAllCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

export default characterSlice.reducer;


