import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredientsCard.module.css';
import { showModal } from '../../../services/actions/detail';

export default function BurgerIngredientsCard({ data, count }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModalHandler = () => { 
    dispatch(showModal(data._id));
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

BurgerIngredientsCard.propTypes = {
  "data": PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "calories": PropTypes.number.isRequired,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
  }).isRequired,
}; 