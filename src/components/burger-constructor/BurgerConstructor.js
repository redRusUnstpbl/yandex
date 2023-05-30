import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import BurgerConstructorItem from './burger-constructor-item/BurgerConstructorItem';
import OrderDetails from '../order-details/OrderDetails';
import Modal from '../modal/modal';

export default function BurgerConstructor({ data }) {
    const sum = useMemo(() => data.reduce((sum, cur) => sum + cur.price, 0), [data]);

    const [modal, setModal] = useState(false);
    
    const modalClose = () => {
        setModal(false);
    }

    const modalShow = () => {
        setModal(true);
    }

    return (
        <>
            <section className={BurgerConstructorStyle.burger_constructor}>
                <div className={BurgerConstructorStyle.burger_constructor_items}>
                    {data ?
                        <>
                            <BurgerConstructorItem
                                type="top"
                                isLocked={true}
                                text={`${data[0].name} (верх)`}
                                price={data[0].price}
                                thumbnail={data[0].image}
                            />
                            <ul className={BurgerConstructorStyle.burger_constructor_list}>
                                {data.map(function (item, i) {
                                    if (i != 0) {
                                        return (
                                            <li key={item._id}>
                                                <BurgerConstructorItem
                                                    isLocked={false}
                                                    text={item.name}
                                                    price={item.price}
                                                    thumbnail={item.image}
                                                    isDrag={true}
                                                />
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                            <BurgerConstructorItem
                                type="bottom"
                                isLocked={true}
                                text={`${data[0].name} (низ)`}
                                price={data[0].price}
                                thumbnail={data[0].image}
                            />
                        </>
                        :
                        <p className="text text_type_main-small">
                            Ингредиенты не найдены.
                        </p>
                    }
                </div>

                <div className={BurgerConstructorStyle.burger_constructor_price}>
                    <p className={BurgerConstructorStyle.burger_constructor_price_value}>
                        <span>{sum}</span>
                        <CurrencyIcon type="primary" />
                    </p>
                    <Button htmlType="button" type="primary" size="large" onClick={modalShow}>
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {modal && (
                <Modal title="" handleClose={modalClose}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
}

BurgerConstructor.propTypes = {
    "data": PropTypes.arrayOf(PropTypes.shape({
        "_id": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "type": PropTypes.oneOf(['bun', 'sauce', 'main']),
        "price": PropTypes.number.isRequired,
        "image": PropTypes.string.isRequired,
    })).isRequired
}; 
