import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { SET_REGISTER } from '../../services/actions/user';
import { register, setErrorClear } from '../../services/actions/user';
import { Link } from "react-router-dom";
import FormsMain from "../../components/forms/forms-main/FormsMain";
import FormsMainsStyles from '../../components/forms/forms-main/FormsMain.module.css';
import { PasswordInput, EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

function PageRegister() {
  const getUser = (state) => state.user;
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setErrorClear(SET_REGISTER));
  }, [dispatch])

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const onSubmit = e => {
    e.preventDefault();
    if (form.email && form.password && form.name) {
      dispatch(register(form));
    }
  }

  return (
    <FormsMain title="Регистрация">
      {user.isRequest[SET_REGISTER] &&
        <p className={FormsMainsStyles.form_main_info}>{user.isRequest[SET_REGISTER]}</p>
      }
      {user.isFailed[SET_REGISTER] &&
        <p className={FormsMainsStyles.form_main_error}>{user.isFailed[SET_REGISTER]}</p>
      }
      {!user.isRequest[SET_REGISTER] &&
        <form onSubmit={onSubmit}>
          <div className={FormsMainsStyles.form_main_input}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              name={'name'}
            />
          </div>
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
            <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
          </div>

          <div className={FormsMainsStyles.form_main_bottom_text}>
            <p>Уже зарегистрированы? <Link to={'/login'}>Войти</Link></p>
          </div>
        </form>
      }
    </FormsMain>
  );
}

export default PageRegister;
