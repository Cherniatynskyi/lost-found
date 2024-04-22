import './App.css';
import {Route, Routes} from 'react-router-dom'
import { lazy } from 'react';
import { Layout } from './Layout';
import { HomePage } from 'pages/HomePage/HomePage';
import { BrowsePage } from 'pages/BrowsePage/BrowsePage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../redux/Auth/operations';
import { Restricted } from '../Routes/Restricted';
// import { Private } from '../Routes/Private';

function App() {

  const AuthPage = lazy(() => import('../pages/AuthPage/AuthPage'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/:type' element={<BrowsePage/>}/>
        <Route path='/auth/:id' element={<Restricted element={AuthPage}/>}/>
      </Route>
    </Routes>
  );
}

export default App;
