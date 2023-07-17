import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useNavigate } from "react-router-dom";
import { API } from '../../utils/api';
import { showModal } from '../../services/actions/detail';
import { closeModal } from '../../services/actions/detail';
import { addElementToConstructor, removeElementFromConstructor } from '../../services/actions/constructor';
import { incrIngredient, decrIngredient } from '../../services/actions/ingredients';
import { getOrder } from '../../services/actions/order';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyle from './BurgerConstructor.module.css'
import BurgerConstructorItem from './burger-constructor-item/BurgerConstructorItem';
import OrderDetails from '../order-details/OrderDetails';
import Modal from '../modal/modal';

import type { TIngredient, TResponseBody } from '../../utils/types';
import { TabTypes } from '../../utils/types';

type TDropIngredient = {
  data: TIngredient;
}

type TOrderResult = {
  'number': number
}

export default function BurgerConstructor(): JSX.Element {
  const dispatch = useDispatch();
  // @ts-ignore
  const getDataModal = (state) => state.detail.id;
  // @ts-ignore
  const getDataOrder = (state) => state.order.order;
  // @ts-ignore
  const getDataMain = (state) => state.construct.items;
  // @ts-ignore
  const getDataBun = (state) => state.construct.bun;
  // @ts-ignore
  const getUser = (state) => state.user;
  
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const modal = useSelector(getDataModal);
  const modalVisible = modal && modal === 'order_details';

  const order = useSelector(getDataOrder)
  const dataMain = useSelector(getDataMain);
  const dataBun = useSelector(getDataBun);
  const items = dataBun ? dataMain.concat(dataBun) : dataMain;
  const sum = useMemo<number>(() => items.reduce(
    (sum:number, cur:TIngredient) => cur.type === TabTypes.bun ? sum + (cur.price * 2) : sum + cur.price, 0
  ), [items]);

  const makeOrder = () => {
    if (!user.user) {
      navigate('/login', { replace: true })
    } else {
      const ids = items.map((cur:TIngredient) => cur._id);

      dispatch(getOrder(API + '/orders', {
        "ingredients": ids
      })).then(function(result:TResponseBody<'order', TOrderResult>){
        if (result.success) {
          dispatch(showModal('order_details'));
        }
      });
    }
  }

  const setCloseModal = () => {
    dispatch(closeModal());
  }

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: (monitor: any) => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop(item: TDropIngredient) {
      if (item.data.type === TabTypes.bun && dataBun) {
        dispatch(decrIngredient(dataBun));
      }

      dispatch(incrIngredient(item.data));
      dispatch(addElementToConstructor(item.data));
    },
  });

  const deleteItemHander = (index:number) => {
    if (index >= 0) {
      dispatch(decrIngredient(dataMain[index]));
    } else {
      dispatch(decrIngredient(dataBun));
    }

    dispatch(removeElementFromConstructor(index))
  }

  const BurgerConstructorItemsClass: string = [
    BurgerConstructorStyle.burger_constructor_items,
    canDrop ? BurgerConstructorStyle.drop_target : '',
    isHover ? BurgerConstructorStyle.drop_on_target : '',
  ].join(" ");

  const BurgerConstructorBottomClass: string = [
    BurgerConstructorStyle.burger_constructor_price,
    items.length === 0 ? BurgerConstructorStyle.burger_constructor_price_disabled : '',
  ].join(" ");

  const noItemsText: string = canDrop ? "Перетащите ингредиент сюда" : "Необходимо добавить ингредиенты";

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
                  {dataMain.map(function (item: TIngredient, i:number) {
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
        <Modal setCloseModal={setCloseModal}>
          <OrderDetails orderId={order.order.number} />
        </Modal>
      )}
    </>
  );
}