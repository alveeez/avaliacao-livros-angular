# Avaliação de Livros — Front-end Angular

Projeto da Fase 2 da disciplina de Interfaces Web e Serviços Web.

## Tecnologias

- Angular
- TypeScript
- HTML
- CSS
- HttpClient
- API REST Java / Spring Boot

## API utilizada

A API da Fase 1 roda, por padrão, em:

`http://localhost:8080`

O CRUD de livros utiliza:

- GET `http://localhost:8080/livros`
- GET BY ID `http://localhost:8080/livros/{id}`
- POST `http://localhost:8080/livros`
- PUT `http://localhost:8080/livros/{id}`
- DELETE `http://localhost:8080/livros/{id}`

## Executar

Instale Node.js e Angular CLI.

Depois:

```bash
npm install
ng serve
```

Acesse:

`http://localhost:4200`

A API Java precisa estar rodando ao mesmo tempo.

## Importante: CORS

Como o Angular roda em `localhost:4200` e a API em `localhost:8080`, o navegador pode bloquear as requisições por CORS.

Na API Java, adicione `@CrossOrigin(origins = "http://localhost:4200")` acima de `@RestController` nos controllers `LivroController` e `AvaliacaoController`.

Exemplo:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/livros")
public class LivroController {
```

Faça o mesmo em `AvaliacaoController` caso também utilize a tela de avaliações.

## Funcionalidades

- GET ALL: lista todos os livros.
- POST: cadastra um livro pelo formulário.
- PUT: edita um livro existente.
- DELETE: apaga um livro.

## GitHub

Depois de criar um repositório no GitHub:

```bash
git init
git add .
git commit -m "Projeto Angular consumindo API REST"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```
