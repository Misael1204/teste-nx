import { Button, Table } from "react-bootstrap"
import { Item } from "app/models/item"

interface TabelaItensProps {
    itens: Array<Item>;
    onEdit: (item: Item) => void,
    onDelete: (item: Item) => void
}
export const TabelaItens: React.FC<TabelaItensProps> = ({
    itens,
    onEdit,
    onDelete
}) => {

    return(
        <Table striped="sm" responsive>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {
                    itens.map(item => <ItemRow onEdit={onEdit} onDelete={onDelete} key={item.id} item={item} />)
                }
            </tbody>

        </Table>
    )
}

interface ItemRowProps {
    item: Item;
    onEdit: (item: Item) => void,
    onDelete: (item: Item) => void
}


const ItemRow: React.FC<ItemRowProps> = ({
    item,
    onEdit,
    onDelete
}) => {

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.sku}</td>
            <td>{item.nome}</td>
            <td>{item.preco}</td>
            <td>
                <div className="d-flex gap-2">
                    <Button onClick={e => onEdit(item)} variant="warning" size="sm">
                        Editar
                    </Button>
                    <Button onClick={e => onDelete(item)} variant="danger" size="sm">
                        Excluir
                    </Button>
             </div>
            </td>
        </tr>
    )
}