import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";


const characterService = {
    getAll: (page: number): IRes<{}> => axiosService
        .get(`${urls.characters}/?page=${page}&list=20`)
        .then(value => value.data),

    searchCharacters: (page: number, inputCurrent: string): IRes<{}> => axiosService
        .get(`${urls.characters}/?page=${page}&list=20&name=${inputCurrent}`)
        .then(value => value.data),

    filteredSearchCharacters: (page:number, word:string): IRes<{}> => axiosService
        .get(`${urls.characters}/?page=${page}&list=20&${word}`)
        .then(value => value.data),

    filteredSearchLocation: (page:number, word:string): IRes<{}> => axiosService
        .get(`${urls.location}/?page=${page}&list=20&${word}`)
        .then(value => value.data),

    filteredSearchEpisodes: (page:number, word:string): IRes<{}> => axiosService
        .get(`${urls.episode}/?page=${page}&list=20&${word}`)
        .then(value => value.data),
}

export {
    characterService
}