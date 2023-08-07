import ky from 'ky';

const api = ky.extend({
  prefixUrl: process.env.SERVER_ADDRESS,
});

export default api;
