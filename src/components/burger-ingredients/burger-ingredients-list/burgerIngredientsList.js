import { useMemo, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsListStyle from './burgerIngredientsList.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/BurgerIngredientsCard';

const BurgerIngredientsList = forwardRef((props, ref) => {
  const { data, title, type, scrollTop, handleSetTab, containerRef } = props;

  useEffect(() => {
    const parent = containerRef.current.getBoundingClientRect()
    const children = ref.current.getBoundingClientRect();

    handleSetTab({
      top: children.top - parent.top,
      heigth: children.height,
      type: type
    });
  }, [scrollTop, containerRef, handleSetTab, ref, type]);

  const burgerIngredientsCards = useMemo(() => data.map(function (item) {
    if (item.type === 'bun' && item.cnt > 0) return null;

    return (
      <div className={BurgerIngredientsListStyle.burger_ingredients_list_item} key={item._id}>
        <BurgerIngredientsCard data={item} count={item.cnt} />
      </div>
    )
  }), [data]);

  return (
    <div ref={ref} className={BurgerIngredientsListStyle.burger_ingredients_list_container}>
      <h2 className={BurgerIngredientsListStyle.burger_ingredients_list_title}>
        {title}
      </h2>

      {burgerIngredientsCards ?
        <div className={BurgerIngredientsListStyle.burger_ingredients_list_items}>
          {burgerIngredientsCards}
        </div>
        :
        <p className="text text_type_main-small">
          В категории "{title}" нет элементов.
        </p>
      }
    </div>
  );
})

export default BurgerIngredientsList;

BurgerIngredientsList.propTypes = {
  "data": PropTypes.arrayOf(PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
  })).isRequired,
  "title": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "scrollTop": PropTypes.number.isRequired,
  "handleSetTab": PropTypes.func.isRequired,
}; 