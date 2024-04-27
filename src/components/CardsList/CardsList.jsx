import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLostThunk, getFoundThunk } from "../../redux/Cards/operations"
import { Card } from "components/Card/Card"
import css from './CardList.module.css'
import { incPage, decPage } from "../../redux/Cards/cardsSlice"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

export const CardsList = () => {
    const dispatch = useDispatch()
    const cards = useSelector(state => state.cards.cards)
    const type = useSelector(state => state.cards.type)
    const page = useSelector(state => state.cards.page)
    const {location, category} = useSelector(state => state.cards.filters)

    const handleIncPage = () =>{
      dispatch(incPage())
    }

    const handleDecPage = () =>{
      if(page === 1){
        return
      }
      dispatch(decPage())
    }

    useEffect(() => {
      if(type === 'lost'){
        dispatch(getLostThunk({page, location, category}))
      }
      else {
        dispatch(getFoundThunk({page, location, category}))
      }
    }, [dispatch, type, page, location, category])
    
  return (
    <div className={css.browsePage}>
      {cards?.length < 1 && <h2 className={css.defaultTxt}>Карток за такими критеріями не знайдено</h2>}
      <ul className={css.cardsList}>
        {cards.map(card =>{
            return (
                <li key={card._id}><Card card={card}/></li>
            )
        })}
      </ul>
      {cards?.length !== 0 && <div className={css.pagginationWrap}>
        <button disabled={page===1} onClick={handleDecPage} className={`${css.paginateButton} ${page === 1 && css.btnDisabled}`}><FaArrowLeft /></button>
        <span className={css.pagginationCounter}>{page}</span>
        <button disabled={cards?.length<10} onClick={handleIncPage} className={`${css.paginateButton} ${cards?.length<10 && css.btnDisabled}`}><FaArrowRight /></button>
      </div>}
    </div>
  )
}
