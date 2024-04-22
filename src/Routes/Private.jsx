import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const Private = ({element: Element}) =>{
  const isAuth = useSelector(state => state.auth.token)
    return !isAuth ? <Navigate to='/auth/login'/> : <Element/>
}