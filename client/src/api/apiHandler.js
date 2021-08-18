import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response && error.response.data) {
    console.log(error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post('/api/auth/signup', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post('/api/auth/signin', userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get('/api/auth/isLoggedIn')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get('/api/auth/logout')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get('/api/items')
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneItem(id) {
    return service
      .get(`/api/items/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  createOneItem(item) {
    console.log('create item called');
    return service
      .post(`/api/items/`, item)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  editUser(body) {
    return service
      .patch(`/api/users/me`, body)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  getUserItems() {
    return service
      .get(`/api/users/me/items`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
  deleteItem(id) {
    return service.delete("/api/items/" + id).then().catch(errorHandler)
  }
};

export default apiHandler;
