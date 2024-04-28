import css from './Card.module.css'
import { useEffect, useRef } from 'react';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { IoMdClose } from "react-icons/io";
import { deleteCardThunk } from '../../redux/Cards/operations';
import { useDispatch } from 'react-redux';

export const ConfirmDeleteModal = ({id, onClose}) => {

    const firstRender = useRef(false);
    useLockBodyScroll();
    const dispatch = useDispatch()

    useEffect(() => {
        if (firstRender.current === false) {
          window.addEventListener('keydown', handleKeyDown);
        }
    
        return () => {
          firstRender.current = false;
          window.removeEventListener('keydown', handleKeyDown);
        };
      });

      const handleKeyDown = e => {
        if (e.code === 'Escape') {
          onClose()
        }
      };
    
      const backdropClose = e => {
        if (e.target === e.currentTarget) {
          //ЗАКРИТТЯ НА БЕКДРОП
            onClose()
        }
      };
    
      const handleBtnClose = () =>{
        onClose()
      }

      const handleConfirm = () =>{
        dispatch(deleteCardThunk(id))
        onClose()
      }


  return (
    <div onClick={e => backdropClose(e)} className={css.modalBackdrop}>
    <div
      className={css.modalBody}
    >
      <button onClick={handleBtnClose} className={css.closeButton}>
        <IoMdClose/>
      </button>
      <h2 className={css.cnfModalTitle}>Ви дійсно хочете видалити цю публікацію?</h2>
      <div className={css.cnfBtnWrap}>
        <button onClick={handleConfirm} className={css.cnfBtn}>Так</button>
        <button onClick={onClose} className={css.cnfBtn}>Скасувати</button>
      </div>
    </div>
  </div>
  )
}
