import { Routes, Route } from 'react-router-dom';
import SecureScreen from './features/secureScreen/components/SecureScreen';
import Home from './features/home/components/Home';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/secure-page" element={<SecureScreen />} />
      </Routes>
    </div>
  );
};

export default App;
