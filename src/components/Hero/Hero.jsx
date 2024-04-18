import { NavLink } from 'react-router-dom';
import css from './Hero.module.css'
import img from '../../images/1.png'
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export const Hero = () =>{
  return (
    <div className={css.heroWrap}>
        <img className={css.heroImg} src={img} alt="" />
        <h1 className={css.heroTitle}><span>Загубив та Знайшов.</span> <br></br> Найкраще бюро знахідок України 🇺🇦</h1>
        <p className={css.subTitle}>Зручний додаток для справжніх філантропів</p>
        <div className={css.heroBtnContainer}>
            <NavLink to='/lost' className={css.heroBtn}><FaSearch /> Дивитися</NavLink>
            <button className={css.heroBtn}><FaPlus /> Створити</button>
        </div>
    </div>
  )
}
