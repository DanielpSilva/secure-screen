import React from 'react';
import { useAlert } from '../../providers/AlertContext';
import './Alert.css';
import { AlertType } from '../../types/AlertType';

const Alert: React.FC = () => {
  const { alert } = useAlert();

  if (!alert.message) return null;

  const alertTypeToColor: { [key in AlertType]: string } = {
    [AlertType.Success]: '#24A669',
    [AlertType.Warning]: '#E4A445',
    [AlertType.Error]: '#EE6960',
  };

  return (
    <div
      className="alert-bar"
      style={{ backgroundColor: alertTypeToColor[alert.type] }}
    >
      <p>{alert.message}</p>
      <div
        className="alert-timer"
        style={{ animation: `fadeOut linear 3s` }}
      ></div>
    </div>
  );
};

export default Alert;
