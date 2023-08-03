import { FC } from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from '../../services/reducers';

type TProtect = {
  onlyUnAuth?: boolean;
  component: JSX.Element 
}

const Protected: FC<TProtect> = ({ onlyUnAuth = false, component }) => {
  const {user, isAuthChecked } = useSelector((store: RootState) => {
    return {
      'user': store.user.user,
      'isAuthChecked': store.user.isAuthChecked
    }
  });

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth: FC<TProtect> = ({ component }) => (
  <Protected component={component} />
);
export const OnlyUnAuth: FC<TProtect> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);