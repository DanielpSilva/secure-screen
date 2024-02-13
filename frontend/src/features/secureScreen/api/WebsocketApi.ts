/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { WebSocketParamsType } from '../types/WebSocketParamsType';

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
    const socket = io('http://localhost:3001', { query: params });

    socket.on('accessGranted', (message) => {
      onAccessGranted(message);
    });

    socket.on('accessDenied', (message) => {
      onAccessDenied(message);
      navigate('/home');
    });

    socket.on('validationError', (message) => {
      alert(message);
      navigate('/home');
    });

    return () => {
      socket.disconnect();
    };
  }, [onAccessGranted, onAccessDenied]);
};

export default useSocket;
