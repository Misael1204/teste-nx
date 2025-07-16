import { ReactNode } from 'react';
import { Menu } from './menu';
import { Message } from 'components/common';
import { Alert } from 'components/common/messages';

interface LayoutProps {
  titulo?: string;
  children?: ReactNode;
  mensagens?: Array<Alert>;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return (
    <section className="container-fluid py-4">
      <div className="row">
        <Menu />
        <div className="col-12 col-md-9 col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="card-title mb-0">{props.titulo}</h5>
            </div>
            <div className="card-body">
              {props.mensagens &&
                props.mensagens.map((msg) => <Message key={msg.texto} {...msg} />)}

              {props.children ? (
                props.children
              ) : (
                <div className="container mt-4">
                  <h3 className="mb-3">Apresentação do Sistema de Cadastro de Itens (CRUD)</h3>

                  <p>Arthur Ramos,</p>

                  <p>
                    Apresento o sistema de cadastro de itens desenvolvido com foco na implementação das operações
                    fundamentais de um <strong>CRUD</strong> (<em>Create, Read, Update, Delete</em>).
                  </p>

                  <h5 className="mt-4">Funcionalidades Implementadas</h5>
                  <ul>
                    <li>
                      <strong>Listagem de Itens:</strong> Exibição em tabela com informações.
                    </li>
                    <li>
                      <strong>Botões de Ação:</strong> Novo, editar e excluir itens.
                    </li>
                  </ul>

                  <h5 className="mt-4">Observação</h5>
                  <p>
                    As ações de criar, editar e excluir estão preparadas para se comunicar com uma API. No
                    entanto, como esta sem integração com o backend, essas operações não
                    estão ativas. Ao acioná-las, o sistema exibirá mensagens informando que a conexão com o backend não
                    foi estabelecida.
                  </p>
                  <p>
                    Coloco-me à disposição para esclarecer eventuais dúvidas ou realizar uma apresentação detalhada do
                    sistema.
                  </p>

                  <p className="mt-4">
                    <strong>Atenciosamente,</strong>
                    <br />
                    Nilton Misael da Costa
                    <br />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};