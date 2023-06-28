import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OnlyUnAuth, OnlyAuth } from '../protected-route/ProtectedRoute';
import { checkUserAuth } from '../../services/actions/user';
import { getIngredients } from "../../services/actions/ingredients";
import { closeModal } from "../../services/actions/detail";
import { API } from "../../utils/api";
import AppStyles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import PageHome from '../../pages/page-home/PageHome';
import Page404 from '../../pages/page-error/Page404';
import PageLogin from '../../pages/page-login/PageLogin';
import PageRegister from '../../pages/page-register/PageRegister';
import PageProfile from "../../pages/page-profile/PageProfile";
import PagePasswordForgot from "../../pages/page-password/page-password-forgot/PagePasswordForgot";
import PagePasswordReset from "../../pages/page-password/page-password-reset/PagePasswordReset";
import IngredientsDetails from "../ingredient-details/IngredientDetails";
import Modal from "../modal/modal";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const setCloseModal = () => {
    dispatch(closeModal());
    navigate(-1);
  }

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients(API + '/ingredients'));
  }, [dispatch]);

  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        <Routes location={background || location}>
          <Route path='/' element={<PageHome />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientsDetails isPage={true} />} />
          <Route path='/login' element={<OnlyUnAuth component={<PageLogin />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<PageRegister />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<PagePasswordForgot />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<PagePasswordReset />} />} />
          <Route path='/profile' element={<OnlyAuth component={<PageProfile />} />} />
          <Route path='/profile/history' element={<OnlyAuth component={<PageProfile />} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal title="Детали ингредиента" setCloseModal={setCloseModal}>
                  <IngredientsDetails isPage={false} />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
