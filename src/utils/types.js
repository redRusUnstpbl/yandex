import PropTypes from 'prop-types';

export const BurgerIngredientsListProps = {
  "data": PropTypes.arrayOf(PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
  })).isRequired,
  "title": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "scrollTop": PropTypes.number.isRequired,
  "handleSetTab": PropTypes.func.isRequired,
}; 

export const BurgerIngredientsCardProps = {
  "data": PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "calories": PropTypes.number.isRequired,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
  }).isRequired,
}; 

export const BurgerConstructorItemProps = {
  "type": PropTypes.string,
  "isLocked": PropTypes.bool.isRequired,
  "text": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "thumbnail": PropTypes.string.isRequired,
  "isDrag": PropTypes.bool,
  "index": PropTypes.number.isRequired,
  "onDeleteItem": PropTypes.func.isRequired,
}; 