import { useMemo, useState, useEffect, useRef, createRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css'
import BurgerIngredientsList from './burger-ingredients-list/burgerIngredientsList';

const bun = "bun";
const sauce = "sauce";
const main = "main";
const scrollOpt = {
  behavior: "smooth",
};

export default function BurgerIngredient() {
  const containerRef = useRef(null);
  const bunRef = createRef(null);
  const sauceRef = createRef(null);
  const mainRef = createRef(null);

  const [tab, setTab] = useState(bun);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleSetTab = (info) => {
    if (info.top <= 10) {
      setTab(info.type);
    }
  }

  const handleClickTab = (info) => {
    switch (info) {
      case bun: {
        bunRef.current.scrollIntoView(scrollOpt);
        break;
      }
      case sauce: {
        sauceRef.current.scrollIntoView(scrollOpt);
        break;
      }
      case main: {
        mainRef.current.scrollIntoView(scrollOpt);
        break;
      }
    }
  }

  const items = useSelector(state => state.ingredients.items);
  const tabData = [
    {
      type: bun,
      title: "Булки",
      data: useMemo(() => items.filter(x => x.type === bun), [items]),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleTab: handleSetTab,
      active: tab === bun,
      ref: bunRef,
      containerRef: containerRef
    },
    {
      type: sauce,
      title: "Соусы",
      data: useMemo(() => items.filter(x => x.type === sauce), [items]),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleTab: handleSetTab,
      active: tab === sauce,
      ref: sauceRef,
      containerRef: containerRef
    },
    {
      type: main,
      title: "Начинки",
      data: useMemo(() => items.filter(x => x.type === main), [items]),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleTab: handleSetTab,
      active: tab === main,
      ref: mainRef,
      containerRef: containerRef
    }
  ];

  const burgerList = useMemo(() => tabData.map(function (item) {
    return <BurgerIngredientsList
      data={item.data}
      title={item.title}
      type={item.type}
      key={item.type}
      scrollTop={item.scrollTop}
      handleSetTab={handleSetTab}
      ref={item.ref}
      containerRef={item.containerRef}
    />
  }), [tabData]);

  const burgerTabs = useMemo(() => tabData.map(function (item) {
    return <Tab value={item.type} active={item.active} onClick={item.onClick} key={item.type}>{item.title}</Tab>
  }), [tabData]);


  return (
    <section className={BurgerIngredientStyle.burger_ingredient}>
      <h1 className={BurgerIngredientStyle.burger_ingredient_title}>Соберите бургер</h1>

      <div className={BurgerIngredientStyle.burger_ingredient_tabs}>
        {burgerTabs}
      </div>

      <div
        ref={containerRef}
        className={BurgerIngredientStyle.burger_ingredient_items}
        onScroll={handleScroll}
      >
        {burgerList}
      </div>
    </section>
  )
}