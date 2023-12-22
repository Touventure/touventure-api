const { getTourism, getTourismById, register, login } = require('./handler');

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
  {
    method: 'POST',
    path: '/register',
    handler: register,
  },
  {
    method: 'POST',
    path: '/login',
    handler: login,
  },
];

module.exports = routes;
