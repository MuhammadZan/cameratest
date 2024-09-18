import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import DualCameraFeed from './pages/cameratest';
function App() {

  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<DualCameraFeed/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
