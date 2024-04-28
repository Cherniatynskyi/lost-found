import css from './ProfileModal.module.css'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { closeCreateModal } from '../../redux/menuSlice';
import { useState } from 'react';
import Select from 'react-select';
import { categoryOptions, cityOptions } from 'utils/categories';
import { addCardThunk } from '../../redux/Cards/operations';
import { MdAddPhotoAlternate } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

export const CreateModal = () => {
    window.scrollTo(0, 0)
    const navigate = useNavigate()

    const [location, setLocation] = useState('')
    const [category, setCategoty] = useState('')
    const [photo, setPhoto] = useState('')
    

    useLockBodyScroll()
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
        formData.append('contact', data.contact);
    
        return formData;
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newData = createUserDataFormData(data)
        dispatch(addCardThunk(newData))
        dispatch(closeCreateModal())
        navigate('/myposts')
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
        <motion.div
            animate={{ left: 0 }}
            initial={{left: '100%'}}
            className={css.profileModal}>
            <button onClick={()=>dispatch(closeCreateModal())} className={css.menuCloseBtn}><IoMdClose /></button>
            <form className={css.form} onSubmit={handleSubmit}>
                <h2>Створити публікацію</h2>
                <fieldset className={css.typeWrap}>
                    <label className={css.container}>
                        <input  className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="lost" required defaultChecked/>
                        <span
                            className={`${css.checkmark}`}
                        >Загубив</span>
                    </label>
                    <label className={css.container}>
                        <input className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="found" required/>
                        <span
                            className={`${css.checkmark}`}
                        >Знайшов</span>
                    </label>
                </fieldset>
                <div className={css.selectsContainer}>
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
                <div className={css.inputsWrap}>
                    <input
                        className={css.field}
                        type="text"
                        name="title"
                        placeholder="Заголовок"
                        onChange={e => handleChangeData(e)}
                        required
                    />
                    <p className={css.errMsg} name="title" />
                    <label>
                        <textarea
                            className={css.fieldDesc}
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
                            className={css.field}
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
                            className={css.field}
                            type="text"
                            name="price"
                            placeholder="Винагорода"
                            onChange={e => handleChangeData(e)}
                        />
                        <p className={css.errMsg} name="text" />
                    </label>
                    <label>
                        <input
                            className={css.field}
                            type="text"
                            name="contact"
                            placeholder="Контактні дані"
                            onChange={e => handleChangeData(e)}
                        />
                        <p className={css.errMsg} name="text" />
                    </label>
                </div>
                <label htmlFor="avatar" className={css.iconBtnPlusCreate}>
                    <input onChange={test} style={{display:"none"}} type="file" id="avatar" name="avatar" accept="image/*"/>
                    <span className={css.imgBtn}>Завантажити фотографію <MdAddPhotoAlternate size="20px"/></span>
                    {photo && <div className={css.photoPreview}><HiPhoto /> 1</div>}
                </label>
                <button className={css.btnSend} type='submit'>Створити</button>
            </form>
        </motion.div>
    )
}
