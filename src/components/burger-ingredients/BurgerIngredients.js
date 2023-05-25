import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientStyle from './BurgerIngredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsList from './burger-ingredients-list/burgerIngredientsList';


export default function BurgerIngredient({data}) {
    const [tab, setTab] = React.useState('bun');

    let burgerList;
    // Для работы табов
    // switch(tab) {
    //     case 'bun':
    //         burgerList = <BurgerIngredientsList data={data} title={"Булки"} type={'bun'} />
    //         break
    //     case 'sauce':
    //         burgerList = <BurgerIngredientsList data={data} title={"Соусы"} type={'sauce'} />
    //         break
    //     case 'main':
    //         burgerList = <BurgerIngredientsList data={data} title={"Начинки"} type={'main'} />
    //         break
    // }

    // Для вывода как в шаблоне
    burgerList = <>
        <BurgerIngredientsList data={data} title={"Булки"} type={'bun'} />
        <BurgerIngredientsList data={data} title={"Соусы"} type={'sauce'} />
        <BurgerIngredientsList data={data} title={"Начинки"} type={'main'} />
    </>;

    return (
        <section className={BurgerIngredientStyle.burger_ingredient}>
            <h1 className={BurgerIngredientStyle.burger_ingredient_title}>Соберите бургер</h1>

            <div className={BurgerIngredientStyle.burger_ingredient_tabs}>
                <Tab value="bun" active={tab === 'bun'} onClick={setTab}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={setTab}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={setTab}>Начинки</Tab>
            </div>

            <div className={BurgerIngredientStyle.burger_ingredient_items}>
                {burgerList}
            </div>
        </section>
    )
}

BurgerIngredient.propTypes = {
    "data": {
        "_id": PropTypes.string.isRequired,
       "name": PropTypes.string.isRequired,
       "type": PropTypes.oneOf(['bun', 'sauce', 'main']),
       "price": PropTypes.number.isRequired,
       "image": PropTypes.string.isRequired,
    }
}; 