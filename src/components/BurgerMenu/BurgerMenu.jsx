import css from './BurgerMenu.module.css'
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import { closeBurger } from '../../redux/menuSlice';
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { logoutThunk } from '../../redux/Auth/operations';


export const BurgerMenu = () => {
    const dispatch = useDispatch()
    useLockBodyScroll()
    const user = useSelector(state => state.auth.user)
  return (
    <div className={css.menu}>
        <button onClick={()=>dispatch(closeBurger())} className={css.menuCloseBtn}><IoMdClose /></button>
        {user && <div className={css.burgerProfile}>
            <img src="" alt="" />
            <h2>{user.name}</h2>
            <button>mine cards</button>
        </div>}
        <ul className={css.burgerNav}>
            <NavLink onClick={()=>dispatch(closeBurger())} to='/auth/login'>LOST</NavLink>
            <li>found</li>
        </ul>

        {user && <button onClick={()=>dispatch(logoutThunk())} className={css.burgerLogout}>logout</button> }

    </div>
  )
}
