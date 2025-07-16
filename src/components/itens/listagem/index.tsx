import { Layout } from "components/layout"
import Link from "next/link"
import { Item } from "app/models/item"
import useSWR from "swr"
import { TabelaItens } from "./tabela"
import { Button } from "react-bootstrap"
import { HttpClient } from "app/http"
import { AxiosResponse } from "axios"
import Router, { useRouter } from "next/router"
import { useItemService } from "app/services"
import { Alert } from "components/common/messages"
import { useEffect, useState } from "react"


export const ListagemItens: React.FC = () => {

    const service = useItemService();
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const [ lista, setLista] = useState<Item[]>()

    const itens: Item[] = [{
        id: "1", sku:"GH001", nome: "Notebook i5", preco: 3500.00
    },
    {
        id: "2", sku:"GH98", nome: "Impressora HP", preco: 950
    },
    {
        id: "3", sku:"GH12", nome: "Controle Xbox One", preco: 350
    },{
        id: "4", sku:"GH12", nome: "Teclado Gamer", preco: 150
    },{
        id: "5", sku:"XC6", nome: "Mouse Razer", preco: 550
    },{
        id: "6", sku:"GC08", nome: "Monitor LG", preco: 740
    },{
        id: "7", sku:"XTF6", nome: "Cabo USB", preco: 40
    }]
    // const { data: result, error, isLoading } = useSWR<AxiosResponse<Item[]>>('/api/itens', (url: any) => HttpClient.get(url));

    // if (isLoading) {
    //     return <Layout titulo="Itens"><p>Carregando...</p></Layout>;
    // }

    // if (error) {
    //     return <Layout titulo="Itens"><p>Erro ao carregar os Itens.</p></Layout>;
    // }

    // useEffect( () => {
    //     setLista(result?.data || [])

    // }, [result])

    const Editar = (item: Item) => {
        const url = `/cadastros/itens?id=${item.id}`
        Router.push(url)
    }

    const Deletar = (item: Item) => {
        if (!item.id) return "Erro no deletar";
        service.deletar(item.id).then(response => {
            setMessages([
                {tipo: "success", texto: "Item excluido com sucesso"}
            ])
            const listaNova : Item[] = lista?.filter(p => p.id != item.id) || []
            setLista(listaNova)
        })

    }

    return (
        <Layout titulo="Itens" mensagens={messages}>
            <Link href="/cadastros/itens">
                <Button variant="info">Novo</Button>
            </Link>
            <br />
            <TabelaItens itens={itens || []} onDelete={Deletar} onEdit={Editar} />
        </Layout>
    )
}