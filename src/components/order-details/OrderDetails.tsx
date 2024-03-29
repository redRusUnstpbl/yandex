import { FC } from 'react';
import OrderDetailsStyle from "./OrderDetails.module.css";
import OrderDetailsImgDone from "./images/done.png";
import type { TOrderDetails } from '../../utils/types';

const OrderDetails: FC<TOrderDetails> = ({ orderId }) => {
  return (
    <div className={OrderDetailsStyle.card}>
      <p className={OrderDetailsStyle.card_id}>{orderId}</p>
      <p className={OrderDetailsStyle.card_title}>идентификатор заказа</p>
      <img src={OrderDetailsImgDone} alt='order is done'/>
      <p className={OrderDetailsStyle.card_text_1}>Ваш заказ начали готовить</p>
      <p className={OrderDetailsStyle.card_text_2}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;