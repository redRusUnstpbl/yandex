import Page404Styles from './Page404.module.css';

function Page404() {
  return (
    <div className={Page404Styles.error_page}>
      <p className={Page404Styles.error_page_text}>404 error</p>
    </div>
  );
}

export default Page404;
