import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN } from '../../services/actions/user';
import { login, setErrorClear } from '../../services/actions/user';
import { Link } from "react-router-dom";
import FormsMain from "../../components/forms/forms-main/FormsMain";
import FormsMainsStyles from '../../components/forms/forms-main/FormsMain.module.css';
import { PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState } from '../../services/reducers';

function PageLogin() {
  const getUser = (state: RootState) => state.user;
  const [form, setForm] = useState({ email: '', password: '' });
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorClear(SET_LOGIN));
  }, [dispatch])
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email && form.password) {
      dispatch<any>(login(form));
    }
  }

  return (
    <FormsMain title="Вход">
      <>
        {user.isRequest[SET_LOGIN] &&
          <p className={FormsMainsStyles.form_main_info}>{user.isRequest[SET_LOGIN]}</p>
        }
        {user.isFailed[SET_LOGIN] &&
          <p className={FormsMainsStyles.form_main_error}>{user.isFailed[SET_LOGIN]}</p>
        }
        {!user.isRequest[SET_LOGIN] &&
          <form onSubmit={onSubmit}>
            <div className={FormsMainsStyles.form_main_input}>
              <EmailInput
                onChange={onChange}
                value={form.email}
                name={'email'}
                isIcon={false}
              />
            </div>
            <div className={FormsMainsStyles.form_main_input}>
              <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
              />
            </div>
            <div className={FormsMainsStyles.form_main_buttons}>
              <Button htmlType="submit" type="primary" size="medium">
                Войти
              </Button>
            </div>

            <div className={FormsMainsStyles.form_main_bottom_text}>
              <p>Вы — новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
              <p>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
            </div>
          </form>
        }
      </>
    </FormsMain>
  );
}

export default PageLogin;
