import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {characterService} from "../../services/character.service";
import IData from "../../interfaces/IData";
import {ICharacter} from "../../interfaces/ICharacter";


interface IPage {
    page: number;
    inputCurrent: string;
    word: string;
    checkboxName: string;
}

export const fetchCharacters: any = createAsyncThunk<IData, IPage, { rejectValue: string }>(
    'characterSlice/fetchCharacters',
    async (params, {rejectWithValue}): Promise<any> => {
        const {page, inputCurrent, word, checkboxName} = params;

        try {
            if (inputCurrent) {
                return characterService.searchCharacters(page, inputCurrent);
            } else {
                if (word && checkboxName === 'character') {
                    return characterService.filteredSearchCharacters(page, word);
                } else if (word && checkboxName === 'episodes') {
                    return characterService.filteredSearchEpisodes(page, word);
                } else if (word && checkboxName === 'location') {
                    return characterService.filteredSearchLocation(page, word);
                } else {
                    return characterService.getAll(page);
                }
            }
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
);

export interface CharacterState {
    info: Record<string, any>;
    results: ICharacter[];
    count: number;
    pagesCount: number;
    page: number;
    inputCurrent: string;
    word: string;
    csvFile: any;
    checkboxName: string;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: string;
}


const initialState: CharacterState = {
    info: {},
    results: [],
    count: 0,
    pagesCount: 0,
    page: 1,
    inputCurrent: '',
    word: '',
    csvFile: null,
    checkboxName: '',
    status: 'idle',
    error: '',
};


const characterSlice = createSlice({
    name: 'characterSlice',

    initialState,

    reducers: {
        changeName: (state, action) => {
            state.inputCurrent = action.payload;
        },
        changeWord: (state, action) => {
            state.word = action.payload;
        },
        changeCheckboxName: (state, action) => {
            state.checkboxName = action.payload;
        },
        changeCSV: (state, action) => {
            state.csvFile = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.results = action.payload.results;
                state.info = action.payload.info;
                state.count = action.payload.info.count;
                state.pagesCount = action.payload.info.pages;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload || 'Request failed';
            });
    },

});

const {actions: {changeName, changeWord, changeCheckboxName, changeCSV}} = characterSlice;
const characterActions = {changeName, changeWord, changeCheckboxName, changeCSV};

export {characterActions};
export default characterSlice.reducer;


