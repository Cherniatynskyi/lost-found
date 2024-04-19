import css from './Card.module.css'
import { FaLocationDot } from "react-icons/fa6";

export const Card = ({card}) => {
    let date = new Date(card.date);
  return (
    <div className={css.cardWrap}>
        {card.photo ?
         <img className={css.cardImg} src={card.photo} alt="item" />
          :  <img className={css.defaultImg} src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" alt="default"></img>}
        <div className={css.priceTag}>{card.price} $</div>
        <div className={css.infoWrap}>
            <div>
            <h2 className={css.title}>{card.title}</h2>
            <p className={css.desc}>{card.description}</p>
            </div>
            <div className={css.subinfo}>
                <p className={css.date}>{date.toLocaleDateString('en-GB')}</p>
                <p className={css.location}><FaLocationDot /> {card.location}</p>
            </div>
        </div>
    </div>
  )
}
