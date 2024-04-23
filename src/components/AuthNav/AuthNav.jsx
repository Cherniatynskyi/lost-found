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
              className={`${css.authLink} ${
                id === 'register' ? css.linkActive : ''
              }`}
              to="/auth/register"
            >
              Sign up
            </NavLink>
            <NavLink
              className={`${css.authLink} ${id === 'login' ? css.linkActive : ''}`}
              to="/auth/login"
            >
              Log In
            </NavLink>
            
          </div>
          {id === 'register' ? <Register /> : <Login />}
        </div>
      );
}
