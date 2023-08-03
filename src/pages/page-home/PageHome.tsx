import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredient from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import { RootState } from '../../services/reducers';

function PageHome() {
  const getData = (state: RootState) => state.ingredients;
  const { items, itemsRequest, itemsFailed } = useSelector(getData);

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
          <BurgerConstructor />
        </DndProvider>
      }
    </>
  );
}

export default PageHome;
