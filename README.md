# CNPJ Insights Dashboard

Organize consultas cadastrais em lote a partir de uma planilha de CNPJs. A aplicação acompanha o processamento e permite exportar os resultados, aproximando consulta e análise em uma única interface.

[Código do projeto](https://github.com/AdrianHaelisson/cnpj-insights-dashboard) · [Demonstrações AH com dados fictícios](https://ah-automacoes-demo.vercel.app/) · [Portfólio](https://haelisson.com.br)

## O fluxo

1. Importe uma planilha com os CNPJs que deseja consultar.
2. Acompanhe o processamento, as esperas e os resultados na interface.
3. Exporte o resultado parcial ou completo para análise.

O objetivo é reunir as consultas em um processo acompanhável, reduzindo a necessidade de organizar respostas manualmente.

## Recursos

- Importação de arquivos Excel (`.xlsx`, `.xls`) e CSV.
- Tratamento de CNPJs com ou sem formatação.
- Consulta de dados cadastrais pela ReceitaWS.
- Indicação de progresso, esperas e ocorrências durante o processamento.
- Persistência de progresso para retomada e exportação dos resultados.

A disponibilidade e os limites das consultas dependem do provedor. O projeto não é um serviço oficial da Receita Federal.

## Stack

React, TypeScript, Vite, Tailwind CSS e `xlsx`. A integração de consulta usa a [ReceitaWS](https://receitaws.com.br/).

## Executar localmente

Pré-requisitos: Node.js e npm compatíveis com as dependências do projeto.

```bash
git clone https://github.com/AdrianHaelisson/cnpj-insights-dashboard.git
cd cnpj-insights-dashboard
npm install
npm run dev
```

Abra `http://localhost:5173`.

Para gerar os arquivos estáticos:

```bash
npm run build
```

## Publicação

O projeto usa Vite e pode ser configurado como aplicação estática. Na Vercel, importe o repositório, confira o preset Vite e o comando de build do `package.json` antes de publicar. Consulte a [documentação Vercel para Vite](https://vercel.com/docs/frameworks/frontend/vite).

## Escopo e dados

Esta aplicação consulta um serviço externo. Ela é independente do Hub AH, que apresenta experiências locais com dados fictícios. Use arquivos adequados à finalidade da consulta e não versione planilhas operacionais ou respostas com dados de clientes.

## Licença

MIT.
