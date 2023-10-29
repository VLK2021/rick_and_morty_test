import {axiosService, IRes} from "./axios,service";
import {urls} from "../constants/urls";


const characterService = {
    getAll: (page: number): IRes<{}> => axiosService.get(`${urls.characters}/?page=${page}&list=20`)
        .then(value => value.data),

    searchCharacters: (page: number, name: string): IRes<{}> => axiosService.get(`${urls.characters}/?page=${page}&list=20&name=${name}`)
        .then(value => value.data),

    filteredSearchCharacters: (page:number, searchParams: string | string[][] | Record<string, string> | URLSearchParams | undefined) => {
        const queryParams = new URLSearchParams(searchParams);
        return axiosService.get(`${urls.characters}/?page=${page}&list=20&${queryParams.toString()}`);
    }


    //https://rickandmortyapi.com/api/character/?name=rick&status=alive
    //https://rickandmortyapi.com/api/location/
    //https://rickandmortyapi.com/api/episode/

}

export {
    characterService
}