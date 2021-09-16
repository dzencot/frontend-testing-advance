import fastify from 'fastify';
import _ from 'lodash';

const start = async () => {
  const server = fastify({
    logger: true,
  });

  const state = [];

  server.get('/person', async (request, reply) => {
    return state;
  });

  server.get('/person:id', async (request, reply) => {
    const { id } = request.params;
    return state.find((person) => person.id === id);
  });

  server.post('/person', async (request, reply) => {
    state.push(request.body);
  });

  try {
    await server.listen(5000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()
