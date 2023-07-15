import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderButtonStyles from './appHeaderButton.module.css'

export default function AppHeaderButton({ button }) {
    let component;
    let buttonClass = AppHeaderButtonStyles.header_button;
    let buttonType = 'primary';
    if (button.state === 'disabled') {
        buttonClass = AppHeaderButtonStyles.header_button_disabled;
        buttonType = 'secondary';
    }

    switch (button.component) {
        case 'BurgerIcon':
            component = <BurgerIcon type={buttonType} />
            break;
        case 'ListIcon':
            component = <ListIcon type={buttonType} />
            break;
        case 'ProfileIcon':
            component = <ProfileIcon type={buttonType} />
            break;
        default:
            break;
    }

    return (
        <div className={buttonClass}>
            {component}
            <span>{button.text}</span>
        </div>
    )
}

AppHeaderButton.propTypes = {
    "button": PropTypes.shape({
        "component": PropTypes.string.isRequired,
        "state": PropTypes.string.isRequired,
        "text": PropTypes.string.isRequired,
    }).isRequired,
}; 