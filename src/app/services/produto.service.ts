import { HttpClient } from 'app/http'
import { Item } from 'app/models/item'
import { Axios, AxiosResponse } from 'axios'

const resourceURL: string = "api/itens"

export const useItemService = () => {

    const salvar = async (item: Item) : Promise<Item> => {
        const response: AxiosResponse<Item> = await HttpClient.post<Item>(resourceURL, item)
        return response.data;
    }

    const atualizar = async (item: Item) : Promise<void> => {
        const url: string = `${resourceURL}/${item.id}`
        await HttpClient.put<Item>(url, item)
    }
    const carregarItem = async( id: string) : Promise<Item> => {
        const url: string = `${resourceURL}/${id}`
        const response: AxiosResponse<Item> = await HttpClient.get(url)
        return response.data

    }
    const deletar = async (id: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}`
        await HttpClient.delete(url)
    }

    return{
        salvar,
        atualizar,
        carregarItem,
        deletar
    }
}