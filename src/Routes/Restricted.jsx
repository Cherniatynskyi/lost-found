import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const Restricted = ({ element: Element }) => {
  const isLoggedIn = useSelector(state => state.auth.user);
  return isLoggedIn.name ? (
    <Navigate to="/" />
  ) : (
    <Element />
  );
};