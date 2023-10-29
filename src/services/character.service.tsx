import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";


const characterService = {
    getAll: (page: number): IRes<{}> => axiosService.get(`${urls.characters}/?page=${page}&list=20`)
        .then(value => value.data),
    searchCharacters: (page: number, name: string): IRes<{}> => axiosService.get(`${urls.characters}/?page=${page}&list=20&name=${name}`)
        .then(value => value.data),
}

export {
    characterService
}