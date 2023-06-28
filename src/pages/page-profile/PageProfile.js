import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import PageProfileStyles from './PageProfile.module.css';
import PageProfileMain from './page-profile-main/PageProfileMain';
import { Link } from "react-router-dom";
import { logout } from '../../services/actions/user';

const PROFILE = "PROFILE";
const HISTORY = "HISTORY";
const LOGOUT = "LOGOUT";

function PageProfile() {
    const [active, setActive] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/profile/history') {
            setActive(HISTORY);
        } else {
            setActive(PROFILE);
        }
    }, [location]);

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <div className={PageProfileStyles.profile}>
            <div className={PageProfileStyles.profile_links}>
                <div className={active === PROFILE ? PageProfileStyles.profile_links_link_active : PageProfileStyles.profile_links_link}>
                    <Link to="/profile">Профиль</Link>
                </div>
                <div className={active === HISTORY ? PageProfileStyles.profile_links_link_active : PageProfileStyles.profile_links_link}>
                    <Link to="/profile/history">История заказов</Link>
                </div>
                <div className={active === LOGOUT ? PageProfileStyles.profile_links_link_active : PageProfileStyles.profile_links_link}>
                    <Link to='/logout' onClick={onLogout}>Выход</Link>
                </div>

                <div className={PageProfileStyles.profile_links_info}>
                    В этом разделе вы можете<br />
                    изменить свои персональные данные
                </div>
            </div>

            <div className={PageProfileStyles.profile_content}>
                {active === PROFILE && <PageProfileMain />}
            </div>
        </div>
    )
}

export default PageProfile;