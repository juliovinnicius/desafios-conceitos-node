const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes = 0 } = request.body;

  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const repositoyId = repositories.findIndex(
    repository => repository.id === id
  );

  if (repositoyId < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repositoyId].title = title;
  repositories[repositoyId].url = url;
  repositories[repositoyId].techs = techs;

  return response.json(repositories[repositoyId]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(
    repository => repository.id === id
  );

  if (repositoryId < 0) {
    return response.status(400).json({ error: 'Respository not found' });
  }

  repositories.splice(repositoryId, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoyId = repositories.findIndex(
    repository => repository.id === id
  );

  if (repositoyId < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories[repositoyId].likes = repositories[repositoyId].likes + 1;

  return response.json(repositories[repositoyId]);
});

module.exports = app;
