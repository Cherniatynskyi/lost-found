import css from './BurgerMenu.module.css'
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';
import { closeBurger } from '../../redux/menuSlice';
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { logoutThunk } from '../../redux/Auth/operations';
import { FaUser } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { BiSolidDoorOpen } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
import { ProfileModal } from 'components/ProfileModal/ProfileModal';
import { openProfile, openCreateModal } from '../../redux/menuSlice';
import { motion } from "framer-motion"


export const BurgerMenu = () => {
    const dispatch = useDispatch()
    useLockBodyScroll()
    window.scrollTo(0, 0)
    const user = useSelector(state => state.auth.user)
    const profileIsOpen = useSelector(state => state.menu.profileIsOpen)

    const onCreateClick = () =>{
      dispatch(closeBurger())
      dispatch(openCreateModal())
    }


  return (
    <>
    <motion.div 
        className={css.menu}
        animate={{ left: 0 }}
        initial={{left: '100%'}}>
        <button onClick={()=>dispatch(closeBurger())} className={css.menuCloseBtn}><IoMdClose /></button>
        {user.name ?
         <div className={css.burgerProfile}>
            {user?.avatarURL.length>1 ? <img className={css.profileImg} src={user.avatarURL} alt="" /> : <div className={css.defaultImg}><FaUser /></div>}
            <h2 className={css.profileName}>{user.name}</h2>
            <button className={css.profileBtn} onClick={()=>dispatch(openProfile())}>Переглянути профіль<FaUser /></button>
        </div> : <Link to='/auth/login' onClick={()=>dispatch(closeBurger())} className={`${css.burgerBtn} ${css.login}`}>Увійти <MdLogin /></Link>}
        <div className={css.navWrap}>
          <ul className={css.burgerNav}>
              {user && <Link className={css.burgerBtn} onClick={()=>dispatch(closeBurger())} to={user ? '/myposts' : 'auth/login'}>Мої оголошення <FaListUl /></Link>}
              <Link className={css.burgerBtn} onClick={onCreateClick} to={user ? '/' : 'auth/login'}>Створити публікацію<IoAddCircleSharp /></Link>
          </ul>
          {user.name && <button onClick={()=>dispatch(logoutThunk())} className={`${css.burgerBtn} ${css.logout}`}>Вийти <BiSolidDoorOpen /></button> }
        </div>
    </motion.div>
   {profileIsOpen && <ProfileModal></ProfileModal>}
    </>
  )
}
