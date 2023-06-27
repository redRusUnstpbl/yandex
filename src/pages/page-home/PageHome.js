import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { API } from '../../utils/api';
import { getIngredients } from '../../services/actions/ingredients';
import BurgerIngredient from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

function PageHome() {
  const getData = (state) => state.ingredients;
  const { items, itemsRequest, itemsFailed } = useSelector(getData);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getIngredients(API + '/ingredients')) 
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}

export default PageHome;
