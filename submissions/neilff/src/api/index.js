import agent from 'superagent';

const BASE_URL = 'http://localhost:3000';

function fetchDarkJedi(id) {
  return agent.get(`${BASE_URL}/dark-jedis/${id}`);
}

export default {
  fetchDarkJedi,
};
