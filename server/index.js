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
    return state.find((person) => person.id === id);
  });

  server.post('/person', async (request, reply) => {
    const newPerson = { ...JSON.parse(request.body), id: _.uniqueId() };

    state.push(newPerson);
    return newPerson;
  });

  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
};

start()
