import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { API } from '../../utils/api';
import { getIngredients } from '../../services/actions/ingredients';
import IngredientsDetailsStyle from './IngredientDetails.module.css';

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

export default function IngredientsDetails({ isPage }) {
  const getDataIngredients = (state) => state.ingredients.items;
  const getDataModal = (state) => state.detail.id;

  const dispatch = useDispatch();
  const { ingredientId } = useParams();
  const ingredients = useSelector(getDataIngredients);
  let id = useSelector(getDataModal);

  if (ingredientId) {
    id = ingredientId;
  }

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients(API + '/ingredients'))
    }
  }, [dispatch, ingredients]);

  const data = useMemo(() => ingredients.filter(x => x._id === id), [ingredients, id]);
  const info = useMemo(() => prepareInfo(data[0]), [data]);

  let result =
    <>
      {data.length > 0 &&
        <div className={IngredientsDetailsStyle.card}>
          <div className={IngredientsDetailsStyle.card_picture}>
            <img src={data[0].image_large} alt='' />
          </div>
          <div className={IngredientsDetailsStyle.card_name}>
            {data[0].name}
          </div>

          {Object.keys(info) && (
            <div className={IngredientsDetailsStyle.card_info_items}>
              {Object.keys(info).map(function (item, i) {
                return (
                  <div className={IngredientsDetailsStyle.card_info_item} key={i}>
                    <p className={IngredientsDetailsStyle.card_info_name}>{info[item]['name']}</p>
                    <p className={IngredientsDetailsStyle.card_info_value}>{info[item]['value']}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      }
    </>;

  if (isPage) {
    result =
      <div className={IngredientsDetailsStyle.card_detail_page}>
        <p className={IngredientsDetailsStyle.card_detail_title}>Детали ингредиента</p>
        {result}
      </div>
  }

  return result;
}

IngredientsDetails.propTypes = {
  "isPage": PropTypes.bool.isRequired,
}; 