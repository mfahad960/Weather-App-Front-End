import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weather from './pages/Weather';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weather/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
