import PropTypes from 'prop-types';
import BurgerIngredientsListStyle from './burgerIngredientsList.module.css';
import BurgerIngredientsCard from '../burger-ingredients-card/BurgerIngredientsCard';

export default function BurgerIngredientsList({ data, title }) {
    let burgerIngredientsCards = data.map(function (item) {
        return (
            <div className={BurgerIngredientsListStyle.burger_ingredients_list_item} key={item._id}>
                <BurgerIngredientsCard image={item.image} count={1} price={item.price} name={item.name} />
            </div>
        )
    });

    return (
        <div className={BurgerIngredientsListStyle.burger_ingredients_list_container}>
            <h2 className={BurgerIngredientsListStyle.burger_ingredients_list_title}>
                {title}
            </h2>

            {burgerIngredientsCards ?
                <div className={BurgerIngredientsListStyle.burger_ingredients_list_items}>
                    {burgerIngredientsCards}
                </div>
                :
                <p className="text text_type_main-small">
                    В категории "{title}" нет элементов.
                </p>
            }
        </div>
    );
}

BurgerIngredientsList.propTypes = {
    "data": PropTypes.arrayOf(PropTypes.shape({
        "_id": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "price": PropTypes.number.isRequired,
        "image": PropTypes.string.isRequired,
    })).isRequired,
    "title": PropTypes.string.isRequired,
}; 