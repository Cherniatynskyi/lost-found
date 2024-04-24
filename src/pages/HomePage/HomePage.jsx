import { Hero } from "components/Hero/Hero"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
  return (
    <div className='container'>
    <Hero></Hero>
    <ToastContainer />
    </div>
  )
}
