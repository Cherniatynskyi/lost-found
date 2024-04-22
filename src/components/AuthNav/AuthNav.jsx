import { Login } from "./Login"
import { Register } from "./Register"
import css from './Auth.module.css'

import { NavLink, useParams } from 'react-router-dom';

export const AuthNav = () => {
    const { id } = useParams();
    return (
        <div className={css.authForm}>
          <div className={css.authNav}>
            <NavLink
              className={`${css.authLink1} ${
                id === 'register' ? css.linkActive : ''
              }`}
              to="/auth/register"
            >
              Registration
            </NavLink>
            <NavLink
              className={`${css.authLink2} ${id === 'login' ? css.linkActive : ''}`}
              to="/auth/login"
            >
              Log In
            </NavLink>
            {id === 'register' ? <Register /> : <Login />}
          </div>
        </div>
      );
}
