import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageFeedStyles from './PageFeed.module.css';
import FeedItems from '../../components/feed-items/FeedItems';
import { wsConnect, wsClose } from "../../services/actions/web-socket";
import { RootState } from "../../services/reducers";
import { TOrder } from "../../utils/types";

function PageFeed() {

  const dispatch = useDispatch();
  const getData = (state: RootState) => state.ws;
  const { status, orders, total, totalToday } = useSelector(getData);

  const dataReady = useMemo(() => {
    let cnt = 0;
    let data = (orders as TOrder[]).map((item: TOrder, index: number) => {
      if (item.status == 'done' && cnt < 20) {
        cnt++;
        return <div key={index} className={PageFeedStyles.page_feed_orders_ready_item}>{item.number}</div>
      }
    });
    return data;
  }, [orders]);

  const dataNotReady = useMemo(() => {
    let cnt = 0;
    let data = (orders as TOrder[]).map((item: TOrder, index: number) => {
      if (item.status != 'done' && cnt < 20) {
        cnt++;
        return <div key={index} className={PageFeedStyles.page_feed_orders_work_item}>{item.number}</div>
      }
    });
    return data;
  }, [orders]);


  useEffect(() => {
    dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(wsClose());
    }
  }, [dispatch]);

  return (
    <div className={PageFeedStyles.page_feed}>
      <h1 className={PageFeedStyles.page_feed_title}>Лента заказов</h1>

      {status == 'CONNECTING' &&
        <p className="text text_type_main-default">Загрузка...</p>
      }
      {status == 'ONLINE' && 
        <div className={PageFeedStyles.page_feed_sections}>
          <div className={PageFeedStyles.page_feed_section_list}>
            <FeedItems />
          </div>
          <div className={PageFeedStyles.page_feed_section_orders}>
            <div className={PageFeedStyles.page_feed_orders_stats}>
              <div className={PageFeedStyles.page_feed_orders_ready}>
                <div className={PageFeedStyles.page_feed_orders_title}>Готовы:</div>
                <div className={PageFeedStyles.page_feed_orders_list}>
                  {dataReady}
                </div>
              </div>
              <div className={PageFeedStyles.page_feed_orders_work}>
                <div className={PageFeedStyles.page_feed_orders_title}>В работе:</div>
                <div className={PageFeedStyles.page_feed_orders_list}>
                  {dataNotReady}
                </div>
              </div>
            </div>

            <div className={PageFeedStyles.page_feed_all_time}>
              <div className={PageFeedStyles.page_feed_orders_title}>Выполнено за все время:</div>
              <div className={PageFeedStyles.page_feed_orders_value}>{ total }</div>
            </div>

            <div className={PageFeedStyles.page_feed_today}>
              <div className={PageFeedStyles.page_feed_orders_title}>Выполнено за сегодня:</div>
              <div className={PageFeedStyles.page_feed_orders_value}>{ totalToday }</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PageFeed;