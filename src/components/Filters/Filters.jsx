import Select from 'react-select';
import { useState } from 'react';
import { categoryOptions, cityOptions } from 'utils/categories';
import css from './Filters.module.css'
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/Cards/cardsSlice';

export const Filters = ()=> {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch()

  const handleFilterChange = (e) =>{
    if(e.type){
        setSelectedCity(e.value)
        dispatch(setFilter({filter: "location", value: e.value}))
    }
    else{
        setSelectedCategory(e.value)
        dispatch(setFilter({filter: "category", value: e.value}))
    }
    
  }
  
  return (
    <div className={css.filtersWrap}>
        <div className={css.selectsWrap}>
            <Select
                defaultValue={selectedCity}
                onChange={handleFilterChange}
                options={cityOptions}
                className={css.citySelect}
                placeholder="Місто"
            />
            <Select
                defaultValue={selectedCategory}
                onChange={handleFilterChange}
                options={categoryOptions}
                className={css.citySelect}
                placeholder="Категорія"
            />
        </div>
        <div>
            <label className={css.subFilterWrap} htmlFor="search">
                <input className={css.searchInput} type="text" name='search' />
                <button className={css.searchBtn}><FaSearch></FaSearch></button>
            </label>
        </div>
    </div>
    
  )
}
