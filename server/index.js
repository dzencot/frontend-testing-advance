import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import _ from 'lodash';

const start = async () => {
  const server = fastify({
    logger: true,
  });

  server.register(fastifyCors);

  const state = [];

  server.get('/person', async (request, reply) => {
    return state;
  });

  server.get('/person/:id', async (request, reply) => {
    const { id } = request.params;
    const person = state.find((person) => person.id === id);
    if (!person) {
      const error = new Error(`Error: not found person with id ${id}`);
      reply.code(404);
      return error;
    }

    return person;
  });

  server.post('/person', async (request, reply) => {
    const newPerson = { ...JSON.parse(request.body), id: _.uniqueId() };

    state.push(newPerson);
    return newPerson;
  });

  server.put('/person/:id', async (request, reply) => {
    const { id } = request.params;
    const newPersonData = JSON.parse(request.body);
    const personIndex = state.findIndex((person) => person.id === id);
    if (!personIndex) {
      const error = new Error(`Error: not found person with id ${id}`);
      reply.code(404);
      return error;
    }
    state[personIndex] = { ...newPersonData, id };
  });

  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};

start()
