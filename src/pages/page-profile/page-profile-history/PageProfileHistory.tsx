import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FeedItems from "../../../components/feed-items/FeedItems";
import { wsConnect, wsClose } from "../../../services/actions/web-socket";
import { RootState } from "../../../services/reducers";
import { getCookie } from "../../../services/utils";

function PageProfileHistory() {
    const dispatch = useDispatch();
    const getData = (state: RootState) => state.ws;
    const { status, orders } = useSelector(getData);

    useEffect(() => {
        const token = getCookie('accessToken') ? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : ''
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders' + token));
    
        return () => {
          dispatch(wsClose());
        }
    }, [dispatch]);

    return (
        <>
            {status == 'CONNECTING' &&
                <p className="text text_type_main-default">Загрузка...</p>
            }
            {status == 'ONLINE' && 
                <FeedItems />
            }
        </>
    )

}

export default PageProfileHistory;