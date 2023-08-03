import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredientsCard.module.css';
import { showModal } from '../../../services/actions/detail';
import type { TIngredient } from '../../../utils/types';

type TBurgerIngredientsCard = {
  data: TIngredient
  count: number
};

export const BurgerIngredientsCard: FC<TBurgerIngredientsCard> = ({ data, count }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModalHandler = () => { 
    dispatch(showModal(0));
    navigate(`/ingredients/${data._id}`, {
      state: { background: location }
    })
  };

  const [, drag] = useDrag({
    type: "ingredient",
    item: { data },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <>
      <div
        className={BurgerIngredientsStyle.burger_ingredients_card}
        onClick={showModalHandler}
        ref={drag}
      >
        <Counter
          count={count}
          size="default"
          extraClass={BurgerIngredientsStyle.burger_ingredients_card_counter}
        />

        <div className={BurgerIngredientsStyle.burger_ingredients_card_picture}>
          <img src={data.image} alt='' />
        </div>

        <div className={BurgerIngredientsStyle.burger_ingredients_card_price_block}>
          <div className={BurgerIngredientsStyle.burger_ingredients_card_price_value}>
            <span>{data.price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <p className={BurgerIngredientsStyle.burger_ingredients_card_name}>
          {data.name}
        </p>
      </div>
    </>
  )
}

export default BurgerIngredientsCard;