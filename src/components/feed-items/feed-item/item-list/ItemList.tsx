import { FC } from 'react';
import ItemListStyles from './ItemList.module.css';
import ItemLogo from '../item-logo/ItemLogo';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TItemList = {
    src: string;
    name: string;
    count?: number;
    price?: number;
}

export const ItemList: FC<TItemList> = ({ src, name, count, price }): JSX.Element => {
    let priceString: string = '';
    if (count && price) {
        priceString = `${count} x ${price}`;
    }

    return (
        <div className={ItemListStyles.list_item}>
            <div className={ItemListStyles.list_item_logo}>
                <ItemLogo src={src} />
            </div>
            <div className={ItemListStyles.list_item_title}>
                {name}
            </div>
            {priceString &&
                <div className={ItemListStyles.list_item_price}>
                    <div className={ItemListStyles.list_item_price_value}>{priceString}</div>
                    <CurrencyIcon type="primary" />
                </div>
            }
        </div>
    );
}

export default ItemList;