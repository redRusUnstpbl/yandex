import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { API } from '../../utils/api';
import { showModal } from '../../services/actions/detail';
import { addElementToConstructor, removeElementFromConstructor } from '../../services/actions/constructor';
import { incrIngredient, decrIngredient } from '../../services/actions/ingredients';
import { getOrder } from '../../services/actions/order';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import BurgerConstructorItem from './burger-constructor-item/BurgerConstructorItem';
import OrderDetails from '../order-details/OrderDetails';
import Modal from '../modal/modal';

const bun = 'bun';

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const modal = useSelector(store => store.detail.id);
  const modalVisible = modal && modal === 'order_details';

  const order = useSelector(store => store.order.order)
  const dataMain = useSelector(store => store.construct.items);
  const dataBun = useSelector(store => store.construct.bun);
  const items = dataBun ? dataMain.concat(dataBun) : dataMain;
  const sum = useMemo(() => items.reduce((sum, cur) => cur.type === bun ? sum + (cur.price * 2) : sum + cur.price, 0), [items]);

  const makeOrder = () => {
    const ids = items.map(cur => cur._id);

    dispatch(getOrder(API + '/orders', {
      "ingredients": ids
    }));
  }

  useEffect(() => {
    if (order) {
      dispatch(showModal('order_details'));
    }
  }, [order]);

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item) {
      if (item.data.type === bun && dataBun) {
        dispatch(decrIngredient(dataBun));
      }

      dispatch(incrIngredient(item.data));
      dispatch(addElementToConstructor(item.data));
    },
  });

  const deleteItemHander = (index) => {
    if (index >= 0) {
      dispatch(decrIngredient(dataMain[index]));
    } else {
      dispatch(decrIngredient(dataBun));
    }

    dispatch(removeElementFromConstructor(index))
  }

  const BurgerConstructorItemsClass = [
    BurgerConstructorStyle.burger_constructor_items,
    canDrop ? BurgerConstructorStyle.drop_target : '',
    isHover ? BurgerConstructorStyle.drop_on_target : '',
  ].join(" ");

  const BurgerConstructorBottomClass = [
    BurgerConstructorStyle.burger_constructor_price,
    items.length === 0 ? BurgerConstructorStyle.burger_constructor_price_disabled : '',
  ].join(" ");

  const noItemsText = canDrop ? "Перетащите ингредиент сюда" : "Необходимо добавить ингредиенты";

  return (
    <>
      <section className={BurgerConstructorStyle.burger_constructor}>
        <div className={BurgerConstructorItemsClass} ref={dropTarget}>
          {items.length > 0 ?
            <>
              {dataBun &&
                <div className={BurgerConstructorStyle.burger_constructor_bun_top}>
                  <BurgerConstructorItem
                    type="top"
                    index={-1}
                    isLocked={false}
                    text={`${dataBun.name} (верх)`}
                    price={dataBun.price}
                    thumbnail={dataBun.image}
                    onDeleteItem={deleteItemHander}
                  />
                </div>
              }

              {dataMain.length > 0 &&
                <ul className={BurgerConstructorStyle.burger_constructor_list}>
                  {dataMain.map(function (item, i) {
                    return (
                      <li key={item.key}>
                        <BurgerConstructorItem
                          isLocked={false}
                          index={i}
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                          isDrag={true}
                          onDeleteItem={deleteItemHander}
                        />
                      </li>
                    )
                  })}
                </ul>
              }

              {dataBun &&
                <div className={BurgerConstructorStyle.burger_constructor_bun_bottom}>
                  <BurgerConstructorItem
                    type="bottom"
                    index={-1}
                    isLocked={false}
                    text={`${dataBun.name} (низ)`}
                    price={dataBun.price}
                    thumbnail={dataBun.image}
                    onDeleteItem={deleteItemHander}
                  />
                </div>
              }
            </>
            :
            <p className={BurgerConstructorStyle.burger_constructor_text_info}>
              {noItemsText}
            </p>
          }
        </div>

        <div className={BurgerConstructorBottomClass}>
          <p className={BurgerConstructorStyle.burger_constructor_price_value}>
            <span>{sum}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            disabled={items.length > 0 ? false : true}
            onClick={makeOrder}
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {modalVisible && (
        <Modal>
          <OrderDetails orderId={order.order.number} />
        </Modal>
      )}
    </>
  );
}