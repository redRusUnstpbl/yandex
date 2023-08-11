import { FC } from 'react';
import ItemLogoStyle from './ItemLogo.module.css';

type TItemLogo = {
  src: string;
  more?: number
}

export const ItemLogo: FC<TItemLogo> = ({ src, more }): JSX.Element => {
  return (
    <div className={ItemLogoStyle.logo}>
      <img src={src} />
      {more && 
        <div className={ItemLogoStyle.logo_more}>{more}+</div>
      }
    </div>
  );
}

export default ItemLogo;