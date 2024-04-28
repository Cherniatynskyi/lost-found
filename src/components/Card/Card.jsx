import css from './Card.module.css'
import { FaLocationDot } from "react-icons/fa6";
import { DetailsModal } from './DetailsModal';
import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const Card = ({card}) => {
    let date = new Date(card.date);
    const [isOpen, setIsOpen] = useState(false)
    const [confDltIsOpen, setCnfDltIsOpen] = useState(false)

    const location = useLocation()

    const handleOpenModal = (e) =>{
      if((e.target.nodeName === 'path') || (e.target.nodeName === 'svg')){
        handleOpenCnf()
        return
      }
      setIsOpen(true)
    }

    const handleCloseModal = () =>{
      setIsOpen(false)
    }

    const handleOpenCnf = () =>{
      setCnfDltIsOpen(true)
    }

    const handleCloseCnf = () =>{
      setCnfDltIsOpen(false)
    }

  return (
    <>
    <div onClick={(e)=>handleOpenModal(e)} className={css.cardWrap}>
        {card.photo_url ?
         <img className={css.cardImg} src={card.photo_url} alt="item" />
          :  <img className={css.defaultImg} width="200" height="130" src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" alt="default"></img>}
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
        {location.pathname === '/myposts' && <div className={css.actionBtnWrap}>
            <button className={css.actionBtn}><MdDelete id='deleteBtn'/></button>
        </div>}
    </div>
    {isOpen && <DetailsModal card={card} onClose={handleCloseModal}/>}
    {confDltIsOpen && <ConfirmDeleteModal id={card._id} onClose={handleCloseCnf}/>}
    </>
  )
}
