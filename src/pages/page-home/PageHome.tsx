import { useAppSelector } from '../../services/reducers';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredient from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import { getIngredients } from '../../services/selectors';

function PageHome() {
  const { items, itemsRequest, itemsFailed } = useAppSelector(getIngredients);

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
