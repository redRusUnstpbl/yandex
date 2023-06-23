import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredientsCard.module.css';
import IngredientsDetails from '../../ingredient-details/IngredientDetails';
import Modal from '../../modal/modal';
import { showModal } from '../../../services/actions/detail';

const cardInfo = {
  'calories': {
    'name': 'Калории,ккал'
  },
  'proteins': {
    'name': 'Белки, г'
  },
  'fat': {
    'name': 'Жиры, г'
  },
  'carbohydrates': {
    'name': 'Углеводы, г'
  }
};

function prepareInfo(data) {
  data = typeof data !== 'undefined' ? data : false;

  if (!data || !Object.keys(data)) {
    return {};
  }

  let info = cardInfo;
  Object.keys(data).forEach(function (item) {
    if (Object.keys(cardInfo).includes(item)) {
      info[item] = {
        ...info[item],
        'value': data[item]
      }
    }
  });

  return info;
}

export default function BurgerIngredientsCard({ data, count }) {
  const dispatch = useDispatch();
  const getDataModal = (state) => state.detail.id;
  
  const modal = useSelector(getDataModal);
  const modalVisible = modal && modal === data._id;
  const showModalHandler = () => { dispatch(showModal(data._id)) };

  const [, drag] = useDrag({
    type: "ingredient",
    item: { data },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const info = useMemo(() => prepareInfo(data), [data]);
  
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
          <img src={data.image} />
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

      {modalVisible && (
        <Modal title="Детали ингредиента">
          <IngredientsDetails name={data.name} image={data.image_large} info={info} />
        </Modal>
      )}
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