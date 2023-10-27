import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";
import {ICharacter} from "../interfaces/ICharacter";


const characterService = {
    getAll: (): IRes<ICharacter[]> => axiosService.get(urls.characters).then(value => value.data),
}

export {
    characterService
}