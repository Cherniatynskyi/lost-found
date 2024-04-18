import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLostThunk, getFoundThunk } from "../../redux/operations"

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
    <div>
        {cards.map(card =>{
            return (
                <div key={card._id}>
                    <div>{card.title}</div>
                    <div>{card.description}</div>
                </div>
            )
        })}
    </div>
  )
}
