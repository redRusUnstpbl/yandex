import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import AppHeaderStyles from './AppHeader.module.css';
import { AppHeaderButton } from './app-header-button/AppHeaderButton';

export type THeaderButton = {
    readonly component: string,
    readonly state: string,
    readonly text: string,
    readonly link: string
}

type IHeaderButtons = {
    readonly [sideName: string]: THeaderButton[]
}

export default function AppHeader(): JSX.Element {
    const headerButtons: IHeaderButtons = {
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
                    <Link to={'/'}><Logo /></Link>
                </div>
            </div>
        </header>
    );
}