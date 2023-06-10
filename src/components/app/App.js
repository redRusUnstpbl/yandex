import { useState, useEffect } from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredient from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const API = 'https://norma.nomoreparties.space/api';

function App() {

  const [state, setState] = useState({
    data: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    setState({ data: [], isLoading: true, hasError: false });

    fetch(`${API}/ingredients`)
      .then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
      .then(data => setState({ data: data.data, isLoading: false, hasError: false }))
      .catch(e => {
        setState({ data: [], isLoading: false, hasError: true })
      });
  }, []);

  const { data, isLoading, hasError } = state;

  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        {isLoading && (
          <p className="text text_type_main-default text_color_inactive">Загрузка...</p>
        )}
        {hasError && (
          <p className="text text_type_main-default text_color_inactive">Произошла ошибка</p>
        )}
        {!isLoading && !hasError && data.length &&
          <>
            <BurgerIngredient data={data} />
            <BurgerConstructor data={data} />
          </>
        }

      </main>
    </div>
  );
}

export default App;
