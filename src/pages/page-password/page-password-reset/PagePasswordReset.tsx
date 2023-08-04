import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SET_PASSWORD_RESET } from '../../../services/actions/user';
import { resetPassword } from '../../../services/actions/user';
import { Link } from "react-router-dom";
import FormsMain from "../../../components/forms/forms-main/FormsMain";
import FormsMainsStyles from '../../../components/forms/forms-main/FormsMain.module.css';
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import type { TResponseBody } from '../../../utils/types';
import { getUser } from '../../../services/selectors';
import { useAppSelector, useAppDispatch } from '../../../services/reducers';

function PagePasswordReset() {
  const [form, setForm] = useState({ password: '', token: '' });
  const [result, setResult] = useState('');
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password && form.token) {
      dispatch(resetPassword(form)).then((result: TResponseBody) => {
        if (result.success) {
          setResult('Восстановление пароля завершено, через 5 секунд вы будете перенаправлены на страницу авторизации');
          setTimeout(() => {
            navigate('/login', { replace: true })
          }, 5000);
        }
      });
    }
  }

  return (
    <FormsMain title="Восстановление пароля">
      <>
        {result &&
          <p className={FormsMainsStyles.form_main_info}>{result}</p>
        }
        {user.isRequest[SET_PASSWORD_RESET] &&
          <p className={FormsMainsStyles.form_main_info}>{user.isRequest[SET_PASSWORD_RESET]}</p>
        }
        {user.isFailed[SET_PASSWORD_RESET] &&
          <p className={FormsMainsStyles.form_main_error}>{user.isFailed[SET_PASSWORD_RESET]}</p>
        }
        {!user.isRequest[SET_PASSWORD_RESET] &&
          <form onSubmit={onSubmit}>
            <div className={FormsMainsStyles.form_main_input}>
              <PasswordInput
                onChange={onChange}
                value={form.password}
                name={'password'}
                placeholder={'Введите новый пароль'}
              />
            </div>
            <div className={FormsMainsStyles.form_main_input}>
              <Input
                onChange={onChange}
                value={form.token}
                name={'token'}
                placeholder={'Введите код из письма'}
              />
            </div>
            <div className={FormsMainsStyles.form_main_buttons}>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
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

export default PagePasswordReset;