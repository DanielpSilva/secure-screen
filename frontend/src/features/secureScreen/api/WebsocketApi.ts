import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { WebSocketParamsType } from '../types/WebSocketParamsType';
import constants from '../../../config/constants';

const useSocket = (
  onAccessGranted,
  onAccessDenied,
  params: WebSocketParamsType
) => {
  const navigate = useNavigate();

  if (!params.session || !params.path) {
    navigate('/home');
  }

  useEffect(() => {
    const socket = io(constants.baseURL, { query: params });

    socket.on('accessGranted', (message) => {
      onAccessGranted(message);
    });

    socket.on('accessDenied', (message) => {
      onAccessDenied(message);
      navigate('/home');
    });

    socket.on('validationError', (message) => {
      navigate('/home');
      onAccessDenied(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [onAccessGranted, onAccessDenied, params, navigate]);
};

export default useSocket;
