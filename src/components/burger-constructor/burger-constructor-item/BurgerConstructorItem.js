import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { moveElementInConstructor } from '../../../services/actions/constructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItemStyle from './BurgerConstructorItem.module.css';


export default function BurgerConstructorItem({ type, isLocked, text, price, thumbnail, isDrag, index, onDeleteItem }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "constructorItem",
    hover(item, monitor) {
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

BurgerConstructorItem.propTypes = {
  "type": PropTypes.string,
  "isLocked": PropTypes.bool.isRequired,
  "text": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "thumbnail": PropTypes.string.isRequired,
  "isDrag": PropTypes.bool,
  "index": PropTypes.number.isRequired,
  "onDeleteItem": PropTypes.func.isRequired,
}; 