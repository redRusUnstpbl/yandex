import { API } from "../../../utils/api";
import { useAppDispatch, useAppSelector } from "../../../services/reducers";
import { useEffect, useMemo, FC } from "react";
import { useParams } from "react-router-dom";
import { getDetailWSD, setDetailWSD } from "../../../services/actions/web-socket-detail";
import PageFeedDetailStyles from './PageFeedDetail.module.css';
import ItemList from '../../../components/feed-items/feed-item/item-list/ItemList';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientById } from "../../../services/utils";
import { TIngredient } from "../../../utils/types";
import { getIngredients, getWsd, getWs } from "../../../services/selectors";

type TIngredientValue = {
  value: TIngredient;
  cnt: number
}

type TIngredientGroup = {
  [name: string]: TIngredientValue
}

type TPageFeedDetail = {
  'isPage'?: boolean
}

const PageFeedDetail: FC<TPageFeedDetail> = ({ isPage }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { items } = useAppSelector(getIngredients);
  const { data, isRequest, isFailed } = useAppSelector(getWsd);
  const { orders } = useAppSelector(getWs);

  useEffect(() => {

    let order;
    if (orders) {
      order = orders.find((el) => el.number === Number(id));
    }

    if (order) {
      dispatch(setDetailWSD(order));
    } else {
      dispatch(getDetailWSD(API + '/orders/' + id));
    }
    
  }, [dispatch, id, orders]);


  const sum = useMemo(() => {
    let sum = 0;
    if (data?.ingredients && items) {
      sum = data.ingredients.reduce((sum: any, cur: string) => {
        const ingredient = getIngredientById(items as TIngredient[], cur);
        if (ingredient) return ingredient.price + sum;
        return sum;
      }, 0);
    }

    return sum;
  }, [data, items]);

  const ingredients = useMemo(() => {
    let res;
    let ingredientList:TIngredientGroup = {};

    if (data?.ingredients && items) {
      data.ingredients.forEach((item: string, index: number) => {
        const ingredient = getIngredientById(items as TIngredient[], item);
        if (ingredient) {
          if (!ingredientList[ingredient._id]) {
            ingredientList[ingredient._id] = {
              value: ingredient,
              cnt: 1
            }
          } else {
            ingredientList[ingredient._id]['cnt']++;
          }
        }
      })

      res = Object.entries(ingredientList).map(([item, value]) => {
        return <ItemList
          key={item}
          src={value.value.image}
          name={value.value.name}
          count={value.cnt}
          price={value.value.price}
        />
      })

      return res;
    }
  }, [data, items]);

  const status = useMemo(() => {
    if (data?.status) {
      switch (data.status) {
        case 'done':
          return <div className={PageFeedDetailStyles.feed_status_ready}>Выполнен</div>
        case 'created':
        case 'pending':
          return <div className={PageFeedDetailStyles.feed_status_created}>Готовится</div>
      }
    }
  }, [data?.status]);

  let result = 
    <>
      {isRequest && <p className="text text_type_main-default">Загрузка...</p>}
      {isFailed && <p className="text text_type_main-default">Произошла ошибка</p>}
      {data && !isRequest && !isFailed &&
        <div className={PageFeedDetailStyles.feed}>
          <div className={PageFeedDetailStyles.feed_num}>#{ data.number }</div>
          <div className={PageFeedDetailStyles.feed_top}>
            <div className={PageFeedDetailStyles.feed_title}>{ data.name }</div>
            {status}
          </div>
          <div className={PageFeedDetailStyles.feed_sostav}>Состав:</div>

          <div className={PageFeedDetailStyles.feed_ingredients}>
            {ingredients}
          </div>

          <div className={PageFeedDetailStyles.feed_bottom}>
            <div className={PageFeedDetailStyles.feed_bottom_date}>
              <FormattedDate date={new Date(data.updatedAt)} />
            </div>
            <div className={PageFeedDetailStyles.feed_bottom_price}>
              <div className={PageFeedDetailStyles.feed_bottom_price_value}>{ sum }</div>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      }
    </>;

  if (isPage) {
    result = 
      <div className={PageFeedDetailStyles.page_detail}>
        {result}
      </div>;
  }

  return result;
}

export default PageFeedDetail;