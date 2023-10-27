import {combineReducers, configureStore, Reducer} from "@reduxjs/toolkit";

import characterReducer, {CharacterState} from './slices/character.slice';



interface RootState {
    characters: CharacterState;
}


const rootReducer: Reducer<RootState> = combineReducers({
    characters: characterReducer,
});


const store = configureStore({
    reducer: rootReducer,
});

export default store;