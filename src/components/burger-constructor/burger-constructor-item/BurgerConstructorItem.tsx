import { useRef, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { moveElementInConstructor } from '../../../services/actions/constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItemStyle from './BurgerConstructorItem.module.css';

type TBurgerConstructorItem = {
  type?: "bottom" | "top" | undefined,
  isLocked: boolean,
  text: string,
  price: number,
  thumbnail: string,
  isDrag ?: boolean,
  index: number,
  onDeleteItem: (index: number) => void
}

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ type, isLocked, text, price, thumbnail, isDrag, index, onDeleteItem }): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "constructorItem",
    hover(item: {index: number}, monitor: any) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      
      dispatch(moveElementInConstructor(dragIndex, hoverIndex));
      item.index = hoverIndex
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructorItem",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1
  drag(drop(ref));

  return (
    <>
      <div ref={isDrag ? ref : null} style={{ opacity }} className={BurgerConstructorItemStyle.burger_constructor_item}>
        {isDrag ?
          <div className={BurgerConstructorItemStyle.burger_constructor_item_drag}>
            <DragIcon type="primary" />
          </div>
          :
          <div className={BurgerConstructorItemStyle.burger_constructor_item_no_drag}></div>
        }
        <ConstructorElement
          type={type}
          isLocked={isLocked}
          text={text}
          price={price}
          thumbnail={thumbnail}
          handleClose={() => onDeleteItem(index)}
        />
      </div>
    </>
  )
}

export default BurgerConstructorItem;