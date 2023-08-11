import { useEffect } from "react";
import FeedItems from "../../../components/feed-items/FeedItems";
import { wsConnect, wsClose } from "../../../services/actions/web-socket";
import { getCookie } from "../../../services/utils";
import { getWs } from "../../../services/selectors";
import { useAppDispatch, useAppSelector } from "../../../services/reducers";

function PageProfileHistory() {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector(getWs);

    useEffect(() => {
        const token = getCookie('accessToken') ? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : ''
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders' + token));

        return () => {
            dispatch(wsClose());
        }
    }, [dispatch]);

    return (
        <>
            {status === 'CONNECTING' &&
                <p className="text text_type_main-default">Загрузка...</p>
            }
            {status === 'ONLINE' &&
                <FeedItems />
            }
        </>
    )

}

export default PageProfileHistory;