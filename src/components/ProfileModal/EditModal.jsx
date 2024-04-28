import css from './ProfileModal.module.css'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { closeEditModal } from '../../redux/menuSlice';
import { useState } from 'react';
import Select from 'react-select';
import { categoryOptions, cityOptions } from 'utils/categories';
import { updateCardThunk } from '../../redux/Cards/operations';
import { MdAddPhotoAlternate } from "react-icons/md";
import { HiPhoto } from "react-icons/hi2";
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

export const EditModal = ({card}) => {
    window.scrollTo(0, 0)
    const navigate = useNavigate()

    const [location, setLocation] = useState({value: card.location})
    const [category, setCategoty] = useState({value: card.category})
    const [photo, setPhoto] = useState('')
    

    useLockBodyScroll()
    const [data, setData] = useState({
        type: card.type,
        title: card.title,
        description: card.description,
        date: card.date,
        price: card.price,
        contact: card.contact,
        photo_url: card.photo_url
    })

    const createUserDataFormData = data => {
        const formData = new FormData();
        formData.append('type', data.type);
        formData.append('title', data.title);
        formData.append('date', data.date);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('location', location.value);
        formData.append('category', category.value);
        formData.append('photo_url', data.photo_url);
        formData.append('contact', data.contact);
    
        return formData;
      };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newData = createUserDataFormData(data)
        const {_id} = card
        dispatch(updateCardThunk({id:_id, body: newData}))
        dispatch(closeEditModal())
        navigate('/browse')
    }

    const handleChangeData = (e) =>{
        setData(prev => {
            return {...prev, location: location.value,  category: category.value, [e.target.name]: e.target.value}
        })
    }

    const test = (e) =>{
        setPhoto(e.target.files[0])
    }
    const dispatch = useDispatch()
    return (
        <div className={css.editModal}>
            <button onClick={()=>dispatch(closeEditModal())} className={css.menuCloseBtn}><IoMdClose /></button>
            <form className={css.form} onSubmit={handleSubmit}>
                <h2>Редагувати публікацію</h2>
                <fieldset className={css.typeWrap}>
                    <label className={css.container}>
                        <input  className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="lost" required checked={data.type === 'lost'}/>
                        <span
                            className={`${css.checkmark}`}
                        >Загубив</span>
                    </label>
                    <label className={css.container}>
                        <input className={css.formInput} onChange={e => handleChangeData(e)} type="radio" name="type" value="found" required checked={data.type === 'found'}/>
                        <span
                            className={`${css.checkmark}`}
                        >Знайшов</span>
                    </label>
                </fieldset>
                <div className={css.selectsContainer}>
                    <Select
                        defaultValue={card.location}
                        onChange={setLocation}
                        options={cityOptions}
                        className={css.citySelect}
                        placeholder={card.location}
                    />
                    <Select
                        defaultValue={card.category}
                        onChange={setCategoty}
                        options={categoryOptions}
                        className={css.citySelect}
                        placeholder={card.category}
                    />
                </div>
                <div className={css.inputsWrap}>
                    <input
                        className={css.field}
                        type="text"
                        name="title"
                        placeholder="Заголовок"
                        value={data.title}
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
                            value={data.description}
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
                            value={data.price}
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
                            value={data.contact}
                            onChange={e => handleChangeData(e)}
                        />
                        <p className={css.errMsg} name="text" />
                    </label>
                </div>
                <label htmlFor="avatar" className={css.iconBtnPlusCreate}>
                    <input onChange={test} style={{display:"none"}} type="file" id="avatar" name="avatar" accept="image/*"/>
                    <span className={css.imgBtn}>Змінити фотографію <MdAddPhotoAlternate size="20px"/></span>
                    {photo && <div className={css.photoPreview}><HiPhoto /> 1</div>}
                </label>
                <button className={css.btnSend} type='submit'>Змінити</button>
            </form>
        </div>
    )
}
