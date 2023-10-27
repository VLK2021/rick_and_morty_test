import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";


const characterService = {
    getAll: (): IRes<{}> => axiosService.get(urls.characters).then(value => value.data),
}

export {
    characterService
}