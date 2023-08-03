import { useMemo, FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import IngredientsDetailsStyle from './IngredientDetails.module.css';
import type { TIngredient } from '../../utils/types';
import { RootState } from '../../services/reducers';

type TCardInfo = {
  [type: string]: {
    readonly 'name': string,
    'value'?: string | number
  }
};

type TIngredientsDetails = {
  'isPage': boolean
}

const cardInfo: TCardInfo = {
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

function prepareInfo(data: TIngredient) {
  let info = cardInfo;
  if (data) {
    Object.keys(data).forEach(function (item) {
      if (Object.keys(cardInfo).includes(item)) {
        info[item] = {
          ...info[item],
          'value': data[item as keyof typeof data]
        }
      }
    });
  }

  return info;
}

const IngredientsDetails: FC<TIngredientsDetails> = ({ isPage }) => {
  const getDataIngredients = (state: RootState) => state.ingredients.items;

  const { ingredientId } = useParams();
  // console.log(ingredientId);
  
  const ingredients = useSelector(getDataIngredients);
  const id = useSelector((state: RootState) => {
    if (state.detail.id) {
      return state.detail.id;
    } else if (ingredientId) {
      return ingredientId;
    }
  });

  console.log(id);
  

  const data = useMemo(() => ingredients.filter((x: TIngredient) => x._id === id), [ingredients, id]);
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

export default IngredientsDetails;