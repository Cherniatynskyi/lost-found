import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const Private = ({element: Element}) =>{
  const isAuth = useSelector(state => state.auth.user)
    return !isAuth.name ? <Navigate to='/auth/login'/> : <Element/>
}