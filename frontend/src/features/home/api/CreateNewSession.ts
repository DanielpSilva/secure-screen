import api from '../../../config/api';

const createNewSession = async () => {
  const response = await api.post('session/create-session');
  return response.data;
};

export default createNewSession;
