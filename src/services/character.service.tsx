import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";


const characterService = {
    getAll: (page: number): IRes<{}> => axiosService.get(`${urls.characters}/?page=${page}&list=20`)
        .then(value => value.data),
}

export {
    characterService
}