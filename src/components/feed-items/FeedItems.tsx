import { useMemo} from 'react';
import { useSelector } from 'react-redux';
import FeedItemsStyles from './FeedItems.module.css';
import FeedItem from './feed-item/FeedItem';
import { RootState } from '../../services/reducers';
import { TIngredient, TOrder } from '../../utils/types';
import { getIngredientById } from '../../services/utils';

function FeedItems() {
  const getWs = (state: RootState) => state.ws;
  const getIngredients = (state: RootState) => state.ingredients;

  const { orders } = useSelector(getWs);
  const { items } = useSelector(getIngredients);

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
  }), [orders]);

  return (
    <div className={FeedItemsStyles.feed_items}>
      { orderData }
    </div>
  );
}

export default FeedItems;