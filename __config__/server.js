const server_url = {
  'local': 'localhost',
}

const server_port = {
  'local': 4723,
}

if (!process.env.TEST_CONFIG) {
  throw new Error('TEST_CONFIG environment variable is not defined');
}

const server = process.env.TEST_CONFIG.split('_')[0];

if (!server_url[server]) {
  throw new Error(`Server URL not found for TEST_CONFIG environment ${process.env.TEST_CONFIG}`);
}

export default {
  url: server_url[server],
  port: server_port[server],
};
