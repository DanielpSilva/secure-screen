import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { AlertType } from '../types/AlertType';

interface AlertContextType {
  alert: { message: string; type: AlertType };
  showAlert: (message: string, type: AlertType) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: AlertType }>({
    message: '',
    type: AlertType.Success,
  });

  const showAlert = useCallback(
    (message: string, type: AlertType = AlertType.Success) => {
      setAlert({ message, type });
      setTimeout(
        () => setAlert({ message: '', type: AlertType.Success }),
        3000
      );
    },
    []
  );

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
