import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {characterService} from "../../services/character.service";
import IData from "../../interfaces/IData";
import {ICharacter} from "../../interfaces/ICharacter";


interface IPage {
    page: number;
    name:string; // Визначаємо тип параметру "page"
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

export const searchCharacters:any = createAsyncThunk<IData, IPage, { rejectValue: string }>(
    'characterSlice/searchCharacters',
    async ({page, name}, {rejectWithValue}): Promise<any> => {
        try {
            const dataA = await characterService.searchCharacters(page, name);
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
    pagesCount: number;
    page: number;
    name: string;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: any;
}


const initialState: CharacterState = {
    info: {},
    results: [],
    count: 0,
    pagesCount: 0,
    page: 1,
    name: '',
    status: 'idle',
    error: '',
};


const characterSlice = createSlice({
    name: 'characterSlice',

    initialState,

    reducers: {
        changeName: (state, action) => {
            state.name = action.payload
        }
    },

    extraReducers: builder => {
        builder
            .addCase(getAllCharacters.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(searchCharacters.pending, state => {
                state.status = 'loading';
                state.error = null;
            })

            .addCase(getAllCharacters.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.results = action.payload.results;
                state.info = action.payload.info;
                state.count = action.payload.info.count;
                state.pagesCount = action.payload.info.pages;
            })
            .addCase(searchCharacters.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.results = action.payload.results;
                state.info = action.payload.info;
                state.count = action.payload.info.count;
                state.pagesCount = action.payload.info.pages;
            })


            .addCase(getAllCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    }
});

const {actions: {changeName}} = characterSlice;
const characterActions = {changeName};

export {characterActions};
export default characterSlice.reducer;


