import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getByOwnerThunk } from "../../redux/Cards/operations"
import { Card } from "components/Card/Card"

import css from './CardList.module.css'

export const  MyPostsList = () => {
    const dispatch = useDispatch()
    const ownerCards = useSelector(state => state.cards.ownerCards)
    let user = useSelector(state=> state.auth.user)

    useEffect(() => {
        dispatch(getByOwnerThunk(user._id))
    }, [dispatch, user])

    

  return (
    <>
    {user && <div className={css.browsePage}>
      <ul className={css.cardsList}>
        {ownerCards.map(card =>{
            return (
                <li className={css.myPostsItem} key={card._id}>
                  <Card card={card}/>
                </li>
            )
        })}
      </ul>
      {/* <button className={css.paginateButton}>Далі</button> */}
    </div>}
    </>
  )
}
