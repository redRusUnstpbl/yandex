import { useMemo} from 'react';
import { useAppSelector } from '../../services/reducers';
import FeedItemsStyles from './FeedItems.module.css';
import FeedItem from './feed-item/FeedItem';
import { TIngredient, TOrder } from '../../utils/types';
import { getIngredientById } from '../../services/utils';
import { getWs, getIngredients } from '../../services/selectors';

function FeedItems() {

  const { orders } = useAppSelector(getWs);
  const { items } = useAppSelector(getIngredients);

  const orderData = useMemo(() => (orders as TOrder[]).map((item: TOrder, index) => {
    const ingredients = item.ingredients.map((item) => getIngredientById(items as TIngredient[], item))
    const sum = item.ingredients.reduce((sum, cur) => {
      const ingredient = getIngredientById(items as TIngredient[], cur);
      if (ingredient) return ingredient.price + sum;
      return sum;
    }, 0);

    return <FeedItem 
      key={index} 
      sum={sum} 
      num={item.number} 
      name={item.name} 
      date={item.createdAt}
      ingredients={ingredients as TIngredient[]}
    />
  }), [orders, items]);

  return (
    <div className={FeedItemsStyles.feed_items}>
      { orderData }
    </div>
  );
}

export default FeedItems;