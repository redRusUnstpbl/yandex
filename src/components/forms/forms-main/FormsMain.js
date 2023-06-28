import FormsMainsStyles from './FormsMain.module.css';

function FormsMain({ title, children }) {
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