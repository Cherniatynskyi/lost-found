import css from './BrowseNav.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setType } from '../../redux/Cards/cardsSlice'

export const BrowseNav = () => {
  const type = useSelector(state => state.cards.type)
  const dispatch = useDispatch()

  const onTypeChange = (e) =>{
    if (e.target.id === type){
        return
    }
    dispatch(setType(e.target.id))
  }

  return (
    <div className={css.navWrap}>
        <ul className={css.navBtnList}>
            <button onClick={onTypeChange} id='lost' type='button' className={`${css.navBtn} ${type==='lost' && css.active}`}>Загубив</button>
            <button onClick={onTypeChange} id='found' type='button' className={`${css.navBtn} ${type==='found' && css.active}`}>Знайшов</button>
        </ul>
    </div>
  )
}
