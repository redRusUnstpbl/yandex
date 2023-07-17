import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_PASSWORD_FORGOT } from '../../../services/actions/user';
import { forgotPassword, setErrorClear } from '../../../services/actions/user';
import { Link } from "react-router-dom";
import FormsMain from "../../../components/forms/forms-main/FormsMain";
import FormsMainsStyles from '../../../components/forms/forms-main/FormsMain.module.css';
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import type { TResponseBody } from '../../../utils/types';

function PagePasswordForgot() {
  // @ts-ignore
  const getUser = (state) => state.user;
  const [form, setForm] = useState({ email: '' });
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setErrorClear(SET_PASSWORD_FORGOT));
  }, [dispatch])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email) {
      dispatch(forgotPassword(form)).then((result: TResponseBody) => {
        if (result.success) {
          navigate('/reset-password', { replace: true })
        }
      });
    }
  }

  return (
    <FormsMain title="Восстановление пароля">
      <>
        {user.isRequest[SET_PASSWORD_FORGOT] &&
          <p className={FormsMainsStyles.form_main_info}>{user.isRequest[SET_PASSWORD_FORGOT]}</p>
        }
        {user.isFailed[SET_PASSWORD_FORGOT] &&
          <p className={FormsMainsStyles.form_main_error}>{user.isFailed[SET_PASSWORD_FORGOT]}</p>
        }
        {!user.isRequest[SET_PASSWORD_FORGOT] &&
          <form onSubmit={onSubmit}>
            <div className={FormsMainsStyles.form_main_input}>
              <EmailInput
                onChange={onChange}
                placeholder={'Укажите e-mail'}
                value={form.email}
                name={'email'}
                isIcon={false}
              />
            </div>
            <div className={FormsMainsStyles.form_main_buttons}>
              <Button htmlType="submit" type="primary" size="medium">
                Восстановить
              </Button>
            </div>

            <div className={FormsMainsStyles.form_main_bottom_text}>
              <p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
            </div>
          </form>
        }
      </>
    </FormsMain>
  )
}

export default PagePasswordForgot;