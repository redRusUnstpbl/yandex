import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/reducers';
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
import { 
  getDataModal,
  getDataOrder,
  getDataMain,
  getDataBun,
  getUser
} from '../../services/selectors';

type TDropIngredient = {
  data: TIngredient;
}

type TOrderResult = {
  'number': number
}

export default function BurgerConstructor(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const user = useAppSelector(getUser);
  const { id } = useAppSelector(getDataModal);
  const { order, orderRequest } = useAppSelector(getDataOrder)
  const dataMain = useAppSelector(getDataMain);
  const dataBun = useAppSelector(getDataBun);

  const modalVisible = id && id === 'order_details';
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

  const [{ isHover, canDrop }, dropTarget] = useDrop<TDropIngredient, unknown, { canDrop: boolean, isHover: boolean }> ({
    accept: 'ingredient',
    collect: (monitor) => ({
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
      dispatch(decrIngredient(dataBun as TIngredient));
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
        {orderRequest && 
        <>
          <p className="text text_type_main-default">Заявка на заказ отправлена, ожидайте подтверждения</p>
        </>
        }
        {!orderRequest &&
        <>
          <div className={BurgerConstructorItemsClass} ref={dropTarget} data-test='constructor_area'>
            {items.length > 0 ?
              <>
                {dataBun &&
                  <div className={BurgerConstructorStyle.burger_constructor_bun_top} data-test='constructor_top'>
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
                  <ul className={BurgerConstructorStyle.burger_constructor_list} data-test='constructor_main'>
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
                  <div className={BurgerConstructorStyle.burger_constructor_bun_bottom} data-test='constructor_bottom'>
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

          <div className={BurgerConstructorBottomClass} data-test='make-order'>
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
        </>
        }
      </section>

      {order && order.number && modalVisible && 
        <Modal setCloseModal={setCloseModal}>
          <OrderDetails orderId={order.number} />
        </Modal>
      }
    </>
  );
}