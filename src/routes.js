const { getTourism, getTourismById } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/tourism',
    handler: getTourism,
  },
  {
    method: 'GET',
    path: '/tourism/{id}',
    handler: getTourismById,
  },
];

module.exports = routes;
