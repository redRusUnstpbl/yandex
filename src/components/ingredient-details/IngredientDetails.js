import PropTypes from 'prop-types';
import IngredientsDetailsStyle from './IngredientDetails.module.css';

export default function IngredientsDetails({ image, name, info }) {
    
    return (
        <div className={IngredientsDetailsStyle.card}>
            <div className={IngredientsDetailsStyle.card_picture}>
                <img src={image} />
            </div>
            <div className={IngredientsDetailsStyle.card_name}>
                {name}
            </div>

            {Object.keys(info) && (
                <div className={IngredientsDetailsStyle.card_info_items}>
                    {Object.keys(info).map(function(item, i){
                        return (
                            <div className={IngredientsDetailsStyle.card_info_item} key={i}>
                                <p className={IngredientsDetailsStyle.card_info_name}>{info[item]['name']}</p>
                                <p className={IngredientsDetailsStyle.card_info_value}>{info[item]['value']}</p>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

IngredientsDetails.propTypes = {
    "image": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "info": PropTypes.shape({
        "calories": PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "value": PropTypes.number.isRequired,
        }).isRequired,
        "proteins": PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "value": PropTypes.number.isRequired,
        }).isRequired,
        "fat": PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "value": PropTypes.number.isRequired,
        }).isRequired,
        "carbohydrates": PropTypes.shape({
            "name": PropTypes.string.isRequired,
            "value": PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
};