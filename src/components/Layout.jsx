import { Suspense} from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from '../images/logo.png'
import css from './Layout.module.css'

import { TbMenuDeep } from "react-icons/tb";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { IoMdListBox } from "react-icons/io";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import { useSelector, useDispatch } from "react-redux";
import { openBurger, openCreateModal } from "../redux/menuSlice";
import { CreateModal } from "./ProfileModal/CreateModal";

export const Layout = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const isMenuOpen = useSelector(state => state.menu.burgerIsOpen)
    const isCreateModalOpen = useSelector(state => state.menu.createModalIsOpen)
    return (
      <div className={css.main}>
        {isMenuOpen && <BurgerMenu/>}
        {isCreateModalOpen && <CreateModal/>}
        <div className={css.nav}>
            <NavLink to='/'><img className={css.logo} src={logo} alt="" /></NavLink>
            <button onClick={()=>dispatch(openBurger())} className={css.menuBtn}><TbMenuDeep size='35px'/></button>
        </div>

        <Suspense fallback={<div>Loading.....</div>}>
              <Outlet/>
        </Suspense>

        <ul className={css.navButtonsList}>
            <li className={css.BtnItem} style={location.pathname === "/" ? {backgroundColor: "white"} :{}}>
                <NavLink to="/"><GrHomeRounded size="30px" style={location.pathname === '/' ? {fill: "#1a71fe"} : {}}/></NavLink>
            </li>
            <li><button onClick={()=>dispatch(openCreateModal())} className={css.BtnItem} ><GoPlusCircle fill="white" size="40px"/></button></li>
            <li className={css.BtnItem}  style={location.pathname !== "/" ? {backgroundColor: "white"} :{}}>
                <NavLink to="/browse"><IoMdListBox size="30px" style={location.pathname !== '/' ? {fill: "#1a71fe"} : {}}/></NavLink>
            </li>   
        </ul>


      </div>
      
    )
  }