const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

// Métodos HTTP;
//   GET:    -> buscar informações do back-end;
//   POST:   -> criar  informação no back-end;
//   PUT:    -> com o id, alterar informação;
//   PATCH:  -> com o id, alterar informação
//   (algo bem específico)
//   DELETE: -> com o id, deletar uma informação.

// Tipos de Parâmetros:
//   Query Params: Filtros e paginação
//   Route Params: Identificador recursos (atualizar ou deletar)
//   Request body: Corpo da requisição

const projects = [];

app.get('/projects', (request, response) => {
  // const { title, owner } = request.query;
  // const query = request.query;

  // console.log(query);
  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found. 😥' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Projeto not found. 😥' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen('3333', () => console.log('api rodando filhão! 😁'));
