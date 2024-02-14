import { useEffect } from 'react';
import io from 'socket.io-client';
import { WebSocketParamsType } from '../types/WebSocketParamsType';
import constants from '../../../config/constants';

const useSocket = (
  onAccessGranted,
  onAccessDenied,
  params: WebSocketParamsType
) => {
  useEffect(() => {
    const socket = io(constants.baseURL, { query: params });

    socket.on('accessGranted', (message) => {
      onAccessGranted(message);
    });

    socket.on('accessDenied', (message) => {
      onAccessDenied(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [onAccessGranted, onAccessDenied, params]);
};

export default useSocket;
