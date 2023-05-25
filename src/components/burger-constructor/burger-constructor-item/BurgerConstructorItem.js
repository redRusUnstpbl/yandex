import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItemStyle from './BurgerConstructorItem.module.css';

export default function BurgerConstructorItem({type, isLocked, text, price, thumbnail, isDrag}) {
    return (
        <div className={BurgerConstructorItemStyle.burger_constructor_item}>
            {isDrag ?
            <div className={BurgerConstructorItemStyle.burger_constructor_item_drag}>
                <DragIcon type="primary"/>
            </div>
            :
            <div className={BurgerConstructorItemStyle.burger_constructor_item_no_drag}></div>
            }
            <ConstructorElement 
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    )
}

BurgerConstructorItem.propTypes = {
    "type": PropTypes.string.isRequired,
    "isLocked": PropTypes.bool.isRequired,
    "text": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "thumbnail": PropTypes.string.isRequired,
    "isDrag": PropTypes.bool,
}; 