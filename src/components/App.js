import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Layout } from './Layout';
import { HomePage } from 'pages/HomePage/HomePage';
import { BrowsePage } from 'pages/BrowsePage/BrowsePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/:type' element={<BrowsePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
