import { useMemo, useState, useRef, createRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css'
import BurgerIngredientsList from './burger-ingredients-list/burgerIngredientsList';
import type { TIngredient, TTabData, THandleTabInfo } from '../../utils/types';
import { TabTypes } from '../../utils/types';

type TTabDataExt = TTabData & {
  'ref': React.RefObject<HTMLDivElement>,
  'onClick': (info: string) => void,
  'active': boolean,
};

export default function BurgerIngredient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = createRef<HTMLDivElement>();
  const sauceRef = createRef<HTMLDivElement>();
  const mainRef = createRef<HTMLDivElement>();

  const [tab, setTab] = useState<string>(TabTypes.bun);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const handleSetTab = (info: THandleTabInfo) => {
    if (info.top <= 10) {
      setTab(info.type);
    }
  }

  const handleClickTab = (info: string) => {
    switch (info) {
      case TabTypes.bun: {
        (bunRef.current as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      }
      case TabTypes.sauce: {
        (sauceRef.current as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      }
      case TabTypes.main: {
        (mainRef.current as HTMLDivElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      }

      default: 
        break;
    }
  }

  // @ts-ignore
  const getDataIngredients = (state) => state.ingredients.items;

  const items = useSelector(getDataIngredients);
  const tabData:TTabDataExt[] = [
    {
      type: TabTypes.bun,
      title: "Булки",
      data: items.filter((x: TIngredient) => x.type === TabTypes.bun),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleSetTab: handleSetTab,
      active: tab === TabTypes.bun,
      ref: bunRef,
      containerRef: containerRef
    },
    {
      type: TabTypes.sauce,
      title: "Соусы",
      data: items.filter((x: TIngredient) => x.type === TabTypes.sauce),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleSetTab: handleSetTab,
      active: tab === TabTypes.sauce,
      ref: sauceRef,
      containerRef: containerRef
    },
    {
      type: TabTypes.main,
      title: "Начинки",
      data: items.filter((x: TIngredient) => x.type === TabTypes.main),
      onClick: handleClickTab,
      scrollTop: scrollTop,
      handleSetTab: handleSetTab,
      active: tab === TabTypes.main,
      ref: mainRef,
      containerRef: containerRef
    }
  ];

  const burgerList = useMemo(() => tabData.map((item:TTabDataExt) => {
    return <BurgerIngredientsList
      key={item.type}
      {...item}
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