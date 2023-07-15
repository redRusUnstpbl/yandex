import { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PageProfileMainStyles from './PageProfileMain.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser, SET_USER_UPDATE } from '../../../services/actions/user';

function PageProfileMain() {
  const dispatch = useDispatch();
  const getUser = (state) => state.user;
  const user = useSelector(getUser);
  const [form, setForm] = useState({
    name: user.user.name,
    email: user.user.email,
    password: ''
  });

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const nameInputRef = useRef(null);
  const [disabledName, setDisabledName] = useState(true);
  const onNameIconClick = (e) => {
    setTimeout(() => nameInputRef.current.focus(), 0)
    setDisabledName(false);
  }

  const onNameBlur = () => {
    setDisabledName(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(form))
    .then(function(){
      setForm({
        ...form,
        password: ''
      });
    });
  }

  return (
    <form onSubmit={onSubmit} className={PageProfileMainStyles.form}>
      {user.isRequest[SET_USER_UPDATE] &&
        <p className={PageProfileMainStyles.form_info}>{user.isRequest[SET_USER_UPDATE]}</p>
      }
      {user.isFailed[SET_USER_UPDATE] &&
        <p className={PageProfileMainStyles.form_error}>{user.isFailed[SET_USER_UPDATE]}</p>
      }
      {!user.isRequest[SET_USER_UPDATE] &&
        <>
          <div className={PageProfileMainStyles.form_item}>
            <Input
              onChange={onChange}
              type={'text'}
              value={form.name}
              name={'name'}
              placeholder={'Имя'}
              icon={'EditIcon'}
              ref={nameInputRef}
              disabled={disabledName}
              onIconClick={onNameIconClick}
              onBlur={onNameBlur}
              contentEditable={false}
            />
          </div>
          <div className={PageProfileMainStyles.form_item}>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              isIcon={true}
            />
          </div>
          <div className={PageProfileMainStyles.form_item}>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"
            />
          </div>

          <div className={PageProfileMainStyles.form_item}>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div>
        </>
      }
    </form>
  )
}

export default PageProfileMain;