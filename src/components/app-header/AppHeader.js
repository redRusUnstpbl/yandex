import { useState } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './AppHeader.module.css';
import AppHeaderButton from './app-header-button/AppHeaderButton';

export default function AppHeader() {
    const [ headerButtons, setHeaderButtons ] = useState({
        leftSide: [
            {
                component: 'BurgerIcon',
                state: 'enable',
                text: 'Конструктор'
            },
            {
                component: 'ListIcon',
                state: 'disabled',
                text: 'Лента заказов'
            },
        ],
        rightSide: [
            {
                component: 'ProfileIcon',
                state: 'disabled',
                text: 'Личный кабинет'
            },
        ]
    });

    return(
        <header className={AppHeaderStyles.header}>
            {headerButtons.leftSide && 
                <div className={AppHeaderStyles.header_items}>
                    {headerButtons.leftSide.map(function(button, i){
                        return (
                            <div className={AppHeaderStyles.header_items_item} key={i}>
                                <AppHeaderButton button={button} />
                            </div>
                        )
                    })}
                </div>
            }
            {headerButtons.rightSide && 
                <div className={AppHeaderStyles.header_items}>
                    {headerButtons.rightSide.map(function(button, i){
                        return (
                            <div className={AppHeaderStyles.header_items_item} key={i}>
                                <AppHeaderButton button={button} />
                            </div>
                        )
                    })}
                </div>
            }
            <div className={AppHeaderStyles.header_logo}>
                <Logo />
            </div>
        </header>
    );
}