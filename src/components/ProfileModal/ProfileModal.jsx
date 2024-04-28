import css from './ProfileModal.module.css'
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { closeProfile } from '../../redux/menuSlice';
import { updaterUserData } from '../../redux/Auth/operations';
import ImageInput from './ImgInput';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";
import { motion } from "framer-motion"

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = Yup.object().shape({
  avatar: Yup.mixed().test('fileType', 'Invalid file format', value => {
    if (!value) return true;
    const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    return supportedFormats.includes(value.type);
  }),
  name: Yup.string()
    .min(2, 'Name must be at least 6 characters')
    .max(32, 'Name must be no more than 16 characters')
    .required('Name is required*'),
  email: Yup.string()
    .matches(emailRegExp, 'Enter a valid Email*')
    .email('Enter a valid Email*')
    .required('Email is required*'),
  password: Yup.string()
    .min(8, 'Password must be at least 6 characters')
    .max(64, 'Password must be no more than 16 characters'),
});

export const ProfileModal = ({onClose}) => {
    const user = useSelector(state=> state.auth.user)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [image, setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    window.scrollTo(0, 0)

    const handleImageChange = imageUrl => {
        setPreviewImage(imageUrl);
      };
    
    const createUserDataFormData = infoUser => {
        const formData = new FormData();
        if (infoUser.password) {
          formData.append('password', infoUser.password);
        }
        formData.append('name', infoUser.name);
        formData.append('email', infoUser.email);
        formData.append('avatarURL', infoUser.avatarURL);
    
        return formData;
      };

    const handleSubmit = (values, { resetForm, setFieldValue }) => {
        const newUserData = {
          name: values.name,
          email: values.email,
          avatarURL: values.avatar,
          ...(values.password && { password: values.password }),
        };
    
        const userData = createUserDataFormData(newUserData);
    
        dispatch(updaterUserData(userData));
        resetForm();
    
        setFieldValue('name', values.name);
        setFieldValue('email', values.email);
      };
    
    const handleClickPasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };


    return (
    <motion.div 
         animate={{ left: 0 }}
        initial={{left: '100%'}}
        className={css.profileModal}>
        <button onClick={()=>dispatch(closeProfile())} className={css.menuCloseBtn}><IoMdClose /></button>
        <>
        <Formik
          className={css.form}
          initialValues={{
            avatar: '',
            avatarURL: user.avatarURL,
            name: user.name,
            email: user.email,
            password: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className={css.avatar}>
              <label className={css.userAvaWrapper}>
                {image || user.avatarURL ? (
                  <img
                    src={image ? image : user.avatarURL}
                    alt=""
                    className={css.userImg}
                    width={68}
                  />
                ) : (
                  <div className={css.userIconBtn}>
                    <FaUser />
                  </div>
                )}

                <label htmlFor="avatar" className={css.iconBtnPlus}>
                  <ImageInput handleChange={handleImageChange} />

                  <FaSquarePlus className={css.addIcon}/>
                </label>
              </label>
            </div>
              <div className={css.fieldsList}>
                  <div className={css.fieldWrapper}>
              <Field
                className={css.field}
                type="text"
                name="name"
                placeholder="name"
              />
              <ErrorMessage name="name">
                {errorMsg => <div className={css.errorMessage}>{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className={css.fieldWrapper}>
              <Field
                className={css.field}
                type="email"
                name="email"
                placeholder="email"
              />
              <ErrorMessage name="email">
                {errorMsg => <div className={css.errorMessage}>{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className={css.fieldWrapper}>
              <Field
                className={css.field}
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                placeholder="password"
              />
              {passwordVisible ? (
                <button
                  className={css.iconBtn}
                  type="button"
                  onClick={handleClickPasswordVisibility}
                >
                <IoMdEyeOff />
                </button>
              ) : (
                <button
                  className={css.iconBtn}
                  type="button"
                  onClick={handleClickPasswordVisibility}
                >
                  <IoEye />
                  
                </button>
              )}
              <ErrorMessage name="password">
                {errorMsg => <div className={css.errorMessage}>{errorMsg}</div>}
              </ErrorMessage>
            </div>
                  </div>
            <button className={css.btnSend} type="submit">
                Зберегти
            </button>
            
          </Form>
        </Formik>
    </>
    </motion.div>
    
  )
}
