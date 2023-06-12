import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { API } from '../../utils/api';
import AppStyles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredient from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

function App() {
  const { items, itemsRequest, itemsFailed } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getIngredients(API + '/ingredients'));
    },
    [dispatch]
  );

  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        {itemsRequest && (
          <p className="text text_type_main-default text_color_inactive">Загрузка...</p>
        )}
        {itemsFailed && (
          <p className="text text_type_main-default text_color_inactive">Произошла ошибка</p>
        )}
        {!itemsRequest && !itemsFailed && items.length &&
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredient />
            <BurgerConstructor data={items} />
          </DndProvider>
        }

      </main>
    </div>
  );
}

export default App;
