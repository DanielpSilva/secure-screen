import { Routes, Route, Navigate } from 'react-router-dom';
import SecureScreen from './features/secureScreen/SecureScreen';
import Home from './features/home/Home';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/secure-screen" element={<SecureScreen />} />
      </Routes>
    </>
  );
};

export default App;
