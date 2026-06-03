
# IFMGBackEndIII


Este repositório tem como objetivo unificar todos os projetos desenvolvidos na disciplina de Desenvolvimento BackEnd II do curso de pós graduação em Desenvolvimento FullStack do IFMG - Sudeste campus Manhuaçu.

## Authors

[@hcbravin](https://www.github.com/hcbravin) - Henrique Casagrande Bravin



## Requisitos

- Node 22+
- MySQL 5+ / Maria DB 10+

## Instalação

Dentro da pasta, rode:

```bash
  npm install
```

## 2.1.Livro

Projeto de Biblioteca virtual do bairro com opções simples de CRUD onde é possível:

- Cadastrar livro
- Atualizar status do livro
- Visualizar informações do livro

## 2.2.Livro

- Inclusão de Cache
- Incusão de páginas de histórico
- Inclusão da página inicial de administrador (modelo)
- Inclusão da página Nossa História

Buscou-se abordar nesta parte do projeto os conceitos de gerenciamento de cache das páginas.

## 2.3.Livro

- Cadastro de usuário
- Modelo Usuário
- Bloqueio de rotas
- Autenticação local com passport-local

Buscou-se abordar nesta parte do projeto os conceitos de autenticação de usuários a fim de bloquear páginas que necessitam de um cadastro/autenticação via rotas atravez do componente passport do node.

## 2.4.Livro

- Divisão do login entre usuario, bibliotecario, admin
- Bloqueio de rotas com base nos perfils de usuário

Buscamos aqui criar um sistema de tipos de perfils com acessos a funcionalidades diferentes. Cada perfil poderá acessar uma determinada funcionalidade. Além disso, o usuário não logado terá menos dados exibidos.

## 3.1.Livros

Aqui buscamos trabalhar a ideia de API. Deste modo, deixamos a interface gráfica e focamos em requisições REST via API usando JSON. Todos os processos se mantem, exceto, a autenticação por usuário.

## 3.2.Livros

Implementação de cache no sistema de API, visto que algumas informações não precisam ser renderizadas pelo servidor e podem ser armazenadas em cache pelo cliente em tempos pré-definidos.

## 3.3.Livros

Implementamos o sistema de documentação. Para isso usamos o Swagger como recurso. Foi necessário criar o arquivo config/swagger-autogen.js. 

- Adição de nova rota para acesso a documentação gerada /api-docs
- Comando no package.json para automatizar a criação.