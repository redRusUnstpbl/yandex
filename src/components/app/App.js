import AppStyles from './App.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredient from '../burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import data from '../../utils/data'

function App() {
  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        <BurgerIngredient data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
