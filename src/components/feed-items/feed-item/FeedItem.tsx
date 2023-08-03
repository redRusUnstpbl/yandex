import { FC } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import FeedItemStyles from './FeedItem.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ItemLogo from './item-logo/ItemLogo';
import { TIngredient } from '../../../utils/types';
import { showModal } from '../../../services/actions/detail';


type TFeedItem = {
  sum: number;
  name: string;
  num: number;
  ingredients: TIngredient[];
  date: string;
}

const FeedItem: FC<TFeedItem> = ({ sum, name, num, ingredients, date }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showModalHandler = () => { 
    dispatch(showModal(0));
    navigate(`${window.location.pathname}/${num}`, {
      state: { background: location }
    })
  };

  const ingredientsData = ingredients.map((item: TIngredient, key) => {
    if (key < 4) {
      return (
        <div className={FeedItemStyles.feed_item_ingredient} key={key}>
          <ItemLogo src={item.image_mobile} />
        </div>
      )
    } else if (key === 4) {
      return (
        <div className={FeedItemStyles.feed_item_ingredient} key={key}>
          <ItemLogo more={(ingredients.length - key)} src={item.image_mobile} />
        </div>
      )
    }

    return '';
  });

  return (
    <div className={FeedItemStyles.feed_item} onClick={showModalHandler}>
      <div className={FeedItemStyles.feed_item_top}>
        <div className={FeedItemStyles.feed_item_num}>#{ num }</div>
        <div className={FeedItemStyles.feed_item_time}>
          <FormattedDate date={new Date(date)} />
        </div>
      </div>
      <div className={FeedItemStyles.feed_item_title}>{ name }</div>

      <div className={FeedItemStyles.feed_item_bottom}>
        <div className={FeedItemStyles.feed_item_ingredients}>
          {ingredientsData}
        </div>
        <div className={FeedItemStyles.feed_item_total}>
          <div className={FeedItemStyles.feed_item_total_value}>{ sum }</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedItem;