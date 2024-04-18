import { Suspense} from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from '../images/logo.png'
import css from './Layout.module.css'

import { TbMenuDeep } from "react-icons/tb";
import { GrHomeRounded } from "react-icons/gr";
import { GoPlusCircle } from "react-icons/go";
import { IoMdListBox } from "react-icons/io";

export const Layout = () => {
    const location = useLocation()
    return (
      <>
        <div className={css.nav}>
            <img className={css.logo} src={logo} alt="" />
            <button className={css.menuBtn}><TbMenuDeep size='35px'/></button>
        </div>

        <Suspense fallback={<div>Loading.....</div>}>
              <Outlet/>
        </Suspense>

        <ul className={css.navButtonsList}>
            <li style={location.pathname === "/" ? {backgroundColor: "white"} :{}}>
                <NavLink to="/"><GrHomeRounded size="30px" style={location.pathname === '/' ? {fill: "#1a71fe"} : {}}/></NavLink>
            </li>
            <li><GoPlusCircle size="40px"/></li>
            <li style={location.pathname !== "/" ? {backgroundColor: "white"} :{}}>
                <NavLink to="/lost"><IoMdListBox size="30px" style={location.pathname !== '/' ? {fill: "#1a71fe"} : {}}/></NavLink>
            </li>   
        </ul>

      </>
      
    )
  }