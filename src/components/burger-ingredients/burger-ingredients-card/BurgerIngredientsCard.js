import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyle from './BurgerIngredientsCard.module.css';

export default function BurgerIngredientsCard({ image, count, price, name }) {
    return (
        <div className={BurgerIngredientsStyle.burger_ingredients_card}>
            <Counter count={count} size="default" extraClass={BurgerIngredientsStyle.burger_ingredients_card_counter} />

            <div className={BurgerIngredientsStyle.burger_ingredients_card_picture}>
                <img src={image} />
            </div>

            <div className={BurgerIngredientsStyle.burger_ingredients_card_price_block}>
                <div className={BurgerIngredientsStyle.burger_ingredients_card_price_value}>
                    <span>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>

            <p className={BurgerIngredientsStyle.burger_ingredients_card_name}>
                {name}
            </p>
        </div>
    )
}

BurgerIngredientsCard.propTypes = {
    "image": PropTypes.string.isRequired,
    "count": PropTypes.number.isRequired,
    "price": PropTypes.number.isRequired,
    "name": PropTypes.string.isRequired,
}; 