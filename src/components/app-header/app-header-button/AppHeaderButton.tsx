import { FC } from 'react';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderButtonStyles from './appHeaderButton.module.css'
import type { THeaderButton } from '../AppHeader';
import type { TIconTypes } from '../../../utils/types';

type TAppHeaderButton = {
    button: THeaderButton
}

export const AppHeaderButton: FC<TAppHeaderButton> = ({ button }): JSX.Element => {
    let component:React.ReactNode;
    let buttonClass:string = AppHeaderButtonStyles.header_button;
    let buttonType:TIconTypes = 'primary';

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