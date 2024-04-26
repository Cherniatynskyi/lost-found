import css from './ProfileModal.module.css'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { closeCreateModal } from '../../redux/menuSlice';
import { useState } from 'react';
import Select from 'react-select';
import { categoryOptions, cityOptions } from 'utils/categories';
import { addCardThunk } from '../../redux/Cards/operations';

export const CreateModal = () => {

    const [location, setLocation] = useState('')
    const [category, setCategoty] = useState('')
    const [photo, setPhoto] = useState('')
    

    const [data, setData] = useState({
        type: "lost",
        title: "",
        description: "",
        date: "",
        price: "",
        contact: "",
        photo_url: ""
    })

    const createUserDataFormData = data => {
        const formData = new FormData();
        formData.append('type', data.type);
        formData.append('title', data.title);
        formData.append('date', data.date);
        formData.append('photo_url', photo);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('location', data.location);
        formData.append('category', data.category);
    
        return formData;
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newData = createUserDataFormData(data)
        dispatch(addCardThunk(newData))
    }

    const handleChangeData = (e) =>{
        setData(prev => {
            return {...prev, location: location.value, photo_url: photo,  category: category.value, [e.target.name]: e.target.value}
        })
    }

    const test = (e) =>{
        setPhoto(e.target.files[0])
    }
    const dispatch = useDispatch()
    return (
        <div className={css.profileModal}>
            <button onClick={()=>dispatch(closeCreateModal())} className={css.menuCloseBtn}><IoMdClose /></button>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Тип публікації</legend>
                    <label>
                        <input className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="lost" required defaultChecked/>
                    </label>
                    <label>
                        <input className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="found" required/>
                    </label>
                </fieldset>
                <div>
                    <Select
                        defaultValue={data.location}
                        onChange={setLocation}
                        options={cityOptions}
                        className={css.citySelect}
                        placeholder="Місто"
                    />
                    <Select
                        defaultValue={data.category}
                        onChange={setCategoty}
                        options={categoryOptions}
                        className={css.citySelect}
                        placeholder="Категорія"
                    />
                </div>
                <input
                    className={css.formInputTitle}
                    type="text"
                    name="title"
                    placeholder="Заголовок"
                    onChange={e => handleChangeData(e)}
                    required
                />
                <p className={css.errMsg} name="title" />
                <label>
                    <textarea
                        className={css.formInput}
                        rows={4}
                        name="description"
                        placeholder='Опис'
                        onChange={e => handleChangeData(e)}
                        required
                    />
                    <p className={css.errMsg} name="text" />
                </label>
                <label>
                    <input
                        className={css.formInputTitle}
                        type="date"
                        name="date"
                        placeholder="дата"
                        onChange={e => handleChangeData(e)}
                        required
                    />
                    <p className={css.errMsg} name="text" />
                </label>
                <label>
                    <input
                        className={css.formInputTitle}
                        type="text"
                        name="price"
                        placeholder="Винагорода"
                        onChange={e => handleChangeData(e)}
                    />
                    <p className={css.errMsg} name="text" />
                </label>
                <label>
                    <input
                        className={css.formInputTitle}
                        type="text"
                        name="contact"
                        placeholder="Номер"
                        onChange={e => handleChangeData(e)}
                    />
                    <p className={css.errMsg} name="text" />
                </label>
                <label htmlFor="avatar" className={css.iconBtnPlus}>
                    <input onChange={test} type="file" id="avatar" name="avatar" accept="image/*"/>
                </label>
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}
