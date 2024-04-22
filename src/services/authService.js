import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:3003/api',
});

export const setToken = token => {
  instance.defaults.headers.common['Authorization'] = token;
};

export const deleteToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

export const signUp = async body => {
  const { data } = await instance.post('/users/register', body);
  setToken(`Bearer ${data.token}`);
  return data;
};

export const logIn = async body => {
  const { data } = await instance.post('/users/login', body);
  setToken(`Bearer ${data.token}`);
  return data;
};

export const logOut = async () => {
  try {
    await instance.post('/users/logout');
    deleteToken();
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  const { data } = await instance.get('/users/current');
  return data;
};


export const updateUser = async body => {
  const { data } = await instance.put('/users/update', body);
  return data.updatedUser;
};