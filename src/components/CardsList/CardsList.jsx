import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLostThunk, getFoundThunk } from "../../redux/operations"
import { Card } from "components/Card/Card"
import css from './CardList.module.css'

export const CardsList = () => {
    const dispatch = useDispatch()
    const cards = useSelector(state => state.cards.cards)
    const type = useSelector(state => state.cards.type)

    useEffect(() => {
      if(type === 'lost'){
        dispatch(getLostThunk())
      }
      else {
        dispatch(getFoundThunk())
      }
    }, [dispatch, type])
    
  return (
    <div className={css.browsePage}>
      <ul className={css.cardsList}>
        {cards.map(card =>{
            return (
                <li key={card._id}><Card card={card}/></li>
            )
        })}
      </ul>
      <button className={css.paginateButton}>Далі</button>
    </div>
  )
}
