import { Input, Message } from "components/common";
import { Layout } from "components/layout";
import { useEffect, useState } from "react";
import { useItemService } from "app/services";
import { Item } from "app/models/item";
import { ConverterEmBigDecimal, formatReal } from "app/utils/money";
import { Alert } from "components/common/messages";
import * as yup from 'yup'
import Link from "next/link";
import { useRouter } from "next/router";

const msgCampoObrigatorio = "Campo obrigatório"

const ValidationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio),
    nome: yup.string().trim().required(msgCampoObrigatorio),
    descricao: yup.string().trim().required(msgCampoObrigatorio),
    preco: yup.number().required(msgCampoObrigatorio).moreThan(0, "valor deve ser maior que 0,00 (zero) ")
})

export const CadastroItens: React.FC = () => {

    const service = useItemService();

    const [ sku, setSku ] = useState<string>(''); 
    const [ preco, setPreco ] = useState<string>('');
    const [ nome, setNome ] = useState<string>('');
    const [ descricao, setDescricao ] = useState<string>('');  
    const [ id, setId] = useState<string>('')
    const [ cadastro, setCadastro] = useState<string>('') 
    const [ messages, setMessages] = useState<Array<Alert>>([])
    
    const router = useRouter();
    const { id: queryId} = router.query

   useEffect(() => {
    if (typeof queryId === 'string') {
        service.carregarItem(queryId).then(itemEncontrado => {
            setId(itemEncontrado.id || '');
            setSku(itemEncontrado.sku || '');
            setNome(itemEncontrado.nome || '');
            setDescricao(itemEncontrado.descricao || "");
            setPreco(formatReal(itemEncontrado.preco || 0));
        });
    }
}, [queryId]);

    const submit = () => {
        const item: Item = {
            id,
            sku, 
            preco: ConverterEmBigDecimal(preco), 
            nome, 
            descricao
        }

        ValidationSchema.validate(item).then(obj => {

            if(id){
                service.atualizar(item).then(response => {
                  setMessages([
                    {tipo: "info", texto: "Atualizado com sucesso!"}
                  ])  
                })
    
            } else{
                service.salvar(item)
                       .then(itemResposta => {
                           setId(itemResposta.id || '')
                           setCadastro(itemResposta.cadastro || '')
                           setMessages([
                            {tipo: "success", texto: "Item salvo com sucesso!"}
                           ])
                       })
            }
        }).catch( err => {
            const field = err.path;
            const message = err.message;

            setMessages([
                {tipo: "warning", field: field, texto: message }
            ])
        })


    }

    return (
    <Layout titulo="Itens" mensagens={messages}>
        <div className="container">
            { id &&
                    <div className="row">

                    <Input label="Codigo:" 
                        columnClasses="col-md-6"
                        value={id}
                        id="inputId"
                        disabled
                    />
                    <Input label="Data Cadastro:" 
                        columnClasses="col-md-6"
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                        
                    />
                </div> 
            }

            <div className="row">

                <Input label="SKU: *" 
                       columnClasses="col-md-6"
                       value={sku}
                       onChange={setSku}
                       id="inputSku"
                       placeholder="Digite o SKU do Item"
                       error="Campo"
                />
                <Input label="Preço: *" 
                       columnClasses="col-md-6"
                       value={preco}
                       onChange={setPreco}
                       id="inputPreco"
                       placeholder="Digite o preço do Item"
                       currency
                       maxLength={16}
                />
            </div>

                <Input label="Nome: *" 
                        value={nome}
                        onChange={setNome}
                        id="inputNome"
                        placeholder="Digite o nome do Item"
                />

           
            <div className="mb-3">
                <label htmlFor="inputDescricao" className="form-label">Descrição*</label>
                <textarea  
                    id="inputDescricao" 
                    value={descricao}
                    onChange={ event => setDescricao(event.target.value)} 
                    className="form-control"
                    placeholder="Digite a descrição do Item"
                />
            </div>

            
            <div className="d-grid gap-2 d-md-block">
                <button onClick={submit} className="btn btn-success me-md-2" type="button">
                    {id ? "Atualizar" : "Salvar"}</button>
                <Link href="/dashboard/itens">
                    <button className="btn btn-warning" type="button">Voltar</button>
                </Link>
            </div>
        </div>
    </Layout>
   );
}