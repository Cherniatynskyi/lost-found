import { useState } from 'react';
import { Formik } from 'formik';
import { Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/Auth/operations';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";


const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = Yup.object().shape({
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
      .max(64, 'Password must be no more than 16 characters')
      .required('Password is required*'),
  });


export const Register = () => {
    const dispatch = useDispatch();
    // const isLoading = useSelector(state=> state.auth.isRefreshing)
  
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const handleClickPasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    const handleSubmit = e => {
      const { name, email, password } = e;
  
      dispatch(registerThunk({ name, email, password }));
  
      // e.reset();
    };
  
    return (
      <>
      {/* {isLoading && <div className={css.loaderBackdrop}>LOADING</div>} */}
      <div className={css.registerForm}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={schema}
          onSubmit={e => handleSubmit(e)}
        >
          {({ errors, touched }) => (
            <Form className={css.Form}>
              <div className={css.fieldWrapper}>
                <Field
                  className={css.field}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                {errors.name && touched.name && (
                  <ErrorMessage name="name">
                    {errorMsg => (
                      <div className={css.errorMessage}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                )}
              </div>
              <div className={css.notError}></div>
              <div className={css.fieldWrapper}>
                <Field
                  className={css.field}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                {errors.email && touched.email && (
                  <ErrorMessage name="email">
                    {errorMsg => (
                      <div className={css.errorMessage}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                )}
              </div>
              <div className={css.notError}></div>
  
              <div className={`${css.fieldWrapper} ${css.passwordWrapper}`}>
                <Field
                  className={css.field}
                  id={css.field_password}
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a password"
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
                {errors.password && touched.password && (
                  <ErrorMessage name="password">
                    {errorMsg => (
                      <div className={css.errorMessage}>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                )}
              </div>
              <div className={css.notError}></div>
              <button className={css.button} type="submit">
                Register Now
              </button>
            </Form>
          )}
        </Formik>
      </div></>
    );
}
