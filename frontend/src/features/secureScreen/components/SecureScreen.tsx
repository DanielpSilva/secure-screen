import React from 'react';
import { useSecureScreen } from '../hooks/useSecureScreen';

const SecureScreen: React.FC = () => {
  const { data, sendDataToWebSocket } = useSecureScreen();

  const handleSendData = (): void => {
    const newData = prompt('Digite os novos dados:');
    if (newData) {
      sendDataToWebSocket(newData);
    }
  };

  return (
    <div>
      <h1>Tela Segura</h1>
      {data && (
        <div>
          <p>{data}</p>
          <button onClick={handleSendData}>Enviar Dados</button>
        </div>
      )}
    </div>
  );
};

export default SecureScreen;
