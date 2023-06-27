import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import AppHeaderStyles from './AppHeader.module.css';
import AppHeaderButton from './app-header-button/AppHeaderButton';

export default function AppHeader() {
    const headerButtons = {
        leftSide: [
            {
                component: 'BurgerIcon',
                state: 'enable',
                text: 'Конструктор',
                link: '/'
            },
            {
                component: 'ListIcon',
                state: 'disabled',
                text: 'Лента заказов',
                link: '#'
            },
        ],
        rightSide: [
            {
                component: 'ProfileIcon',
                state: 'enable',
                text: 'Личный кабинет',
                link: '/profile'
            },
        ]
    }

    return (
        <header className={AppHeaderStyles.header}>
            <div className={AppHeaderStyles.header_container}>
                {headerButtons.leftSide &&
                    <div className={AppHeaderStyles.header_items}>
                        {headerButtons.leftSide.map(function (button, i) {
                            return (
                                <Link to={button.link} className={AppHeaderStyles.header_items_item} key={i}>
                                    <AppHeaderButton button={button} />
                                </Link>
                            )
                        })}
                    </div>
                }
                {headerButtons.rightSide &&
                    <div className={AppHeaderStyles.header_items}>
                        {headerButtons.rightSide.map(function (button, i) {
                            return (
                                <Link to={button.link} className={AppHeaderStyles.header_items_item} key={i}>
                                    <AppHeaderButton button={button} />
                                </Link>
                            )
                        })}
                    </div>
                }
                <div className={AppHeaderStyles.header_logo}>
                    <Logo />
                </div>
            </div>
        </header>
    );
}