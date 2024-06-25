# SuperFrete - Teste

## Estrutura
Como o projeto não possui regras de negócios complexas na camada de domínio, optei por uma estrutura mais simples, separando-o em duas partes principais: HTTP e triggers do Firestore. Ambas são importadas e exportadas no arquivo index para permitir o deploy no GCP de forma mais fácil.

#### HTTP
Na camada HTTP, optei por utilizar um único ponto de entrada com o Express, o que facilita a implantação de novas funções, adicionando apenas uma nova rota. Se o projeto crescer significativamente e houver a necessidade de separar funções em entrypoints distintos, é possível ajustar a estrutura para um monorepo e configurar as codebases no arquivo de configuração do Firebase.

#### Triggers
Na camada das triggers, o foco principal foi assegurar a consistência do incremento de IDs, especialmente porque o Firestore não oferece suporte completo a transações ACID. Para resolver essa questão, aproveitei o helper FieldValue.increment disponível na SDK, eliminando a necessidade de criar uma transação.

#### Testes
Para os testes utilizei o jest.

## Instalação

É necessário ter o emulador do [firebase](https://firebase.google.com/docs/emulator-suite) instalado.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/mvcris/superfrete.git
cd superfrete/functions
npm install
npm start
```
Após rodar esses comandos, será possível realizar um request na rota users:
```sh
curl --location 'http://127.0.0.1:5001/fretetest-bfb5a/us-central1/httpApi/users' \
--header 'Content-Type: application/json' \
--data '{
    "name":"hello"
}'
```
Tambem é possível consultar o dado inserido na UI do emulador, acessando a url: http://localhost:4000/firestore/default/data/users/sequence

## Testes
Em um terminal ligar o emulador:
```sh
npm run start:emulator
```
Após isso, executar o comando de teste:
```sh
npm run test
```
