import { FC } from 'react';
import FormsMainsStyles from './FormsMain.module.css';

type TFormMain = {
  title: string,
  children?: string | JSX.Element
};

const FormsMain: FC<TFormMain> = ({ title, children }) => {
  return (
    <div className={FormsMainsStyles.form_main}>
      {title &&
        <div className={FormsMainsStyles.form_main_title}>{title}</div>
      }
      {children}
    </div>
  )
}

export default FormsMain;