import api from '../../../config/api';
import { CheckActiveSecureScreenAccessType } from '../types/CheckActiveSecureScreen';

const checkActiveSecureScreenAccess = async (
  data: CheckActiveSecureScreenAccessType
) => {
  const response = await api.post(
    'secure-screen-access/check-active-secure-screen-acess',
    data
  );
  return response.data;
};

export default checkActiveSecureScreenAccess;
