import React from 'react'
import css from './Card.module.css'
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { IoMdClose } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { openEditModal } from '../../redux/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { EditModal } from 'components/ProfileModal/EditModal';
import { motion } from "framer-motion"
import { useLocation } from 'react-router-dom';

export const DetailsModal = ({card, onClose}) => {
    window.scrollTo(0, 0)
    useLockBodyScroll()
    const {pathname} = useLocation()
    const dispatch = useDispatch()

    const isEditOpen = useSelector(state => state.menu.editModalIsOpen)
    let date = new Date(card.date);
  return (
    <motion.div 
        className={css.menu}
        animate={{ left: 0 }}
        initial={{left: '100%'}}>
        <button onClick={onClose} className={css.menuCloseBtn}><IoMdClose /></button>
        <div className={css.modalInfoWrap}>
            <div className={css.modalImgWrap}>
            {card.photo_url ?
                <img className={css.defaultModalImg} src={card.photo_url} alt="" />
                 : 
                <img className={css.defaultModalImg} width="200" height="130" src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" alt="default"/>}
                <span className={css.modalTypeThumb}>{card.type}</span>
            </div>
            <div className={css.modalMainInfo}>
                <h2 className={css.modalTitle}>{card.title}</h2>
                <span className={css.modalCategory}>{card.category}</span>
            </div>
            <p className={css.modalDesc}>{card.description}</p>
            <ul className={css.modalSubInfoWrap}>
                <li className={css.subInfoItem}><FaLocationDot /><a href={`https://www.google.com/maps/search/?api=1&query=${card.location}`}> 
                {card.location}</a></li>
                <li className={css.subInfoItem}><MdDateRange /> {date.toLocaleDateString('en-GB')}</li>
                <li className={css.subInfoItem}><FaPhone /> {card.contact}</li>
                <li className={css.subInfoItem}><FaMoneyBill /> {card.price}</li>
            </ul>
        </div>
        <a className={css.callBtn} href={`tel:${card.contact}`}>Зателефонувати <FaPhone /></a>
        {pathname === '/myposts' && <button className={css.btnEdit} onClick={()=>dispatch(openEditModal())}>Редагувати <MdEdit /></button>}
        
        {isEditOpen && <EditModal card={card}/>}
    </motion.div>
  )
}
