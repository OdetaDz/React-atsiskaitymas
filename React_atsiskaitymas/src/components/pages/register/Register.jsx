import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import { v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';
import FormikInput from "../../UI/formikInput/FormikInput";

const Register = () => {

    // console.log('Admin', bcrypt.hashSync('Admin1@', 8));
    // console.log('Cat123', bcrypt.hashSync('Cat1%', 8));
    // console.log('CurageTCD', bcrypt.hashSync('Curage1*', 8));
    // console.log('Pikachu', bcrypt.hashSync('Pikachu1+', 8));

    const navigate = useNavigate();
    const { users, setUsers, UsersActionTypes, setLoggedInUser } = useContext(UsersContext);
    const [failedToRegister, setFailedToRegister] = useState({
        email: '',
        name: ''
    });

    const formValues = {
        userName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        profilePicture: ''
      };

      const validationSchema = Yup.object({
        userName: Yup.string()
          .min(5, 'Username minimum length is 5 symbols')
          .max(20, 'Username maximum length is 20 symbols')
          .required('Field must be filled')
          .trim(),
        email: Yup.string()
          .email('Field must be a valid email')
          .required('Field must be filled')
          .trim(),
        password: Yup.string()
          .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/,
            'Password must be 5-20 length, contain at least one uppercase, one lowercase, one number and one special symbol'
          )
          .required('Field must be filled')
          .trim(),
        passwordRepeat: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Field must be filled')
          .trim(),
        profilePicture: Yup.string()
          .url('Field must be a valid URL')
          .required('Field must be filled')
          .trim()
      });

    const formik = useFormik({
        initialValues: formValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(users.find(user => user.userName === values.userName)){
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        name: 'User with such username already exists'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        name: ''
                    }
                });
            }
            if(users.find(user => user.email === values.email)){
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: 'User with this email already exists'
                    }
                });
            } else {
                setFailedToRegister(prevState => {
                    return {
                        ...prevState,
                        email: ''
                    }
                });
            }

            if(!users.find(user => user.userName === values.userName) && !users.find(user => user.email === values.email)){
                const workingUser = {
                    id: uuid(),
                    userName: values.userName,
                    email: values.email,
                    passwordNormal: values.password,
                    password: bcrypt.hashSync(values.password, 8),
                    registerDate: new Date().toISOString().slice(0,10),
                    profilePicture: values.profilePicture
                };
                setUsers({
                    type: UsersActionTypes.add,
                    data: workingUser
                });
                setLoggedInUser(workingUser);
                navigate('/');
            }
        }
    });

    return ( 
        <main>
            <h1>Register</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput
                type="text"
                name="userName"
                formik={formik}
                placeholder="Create your username"
                />
                <FormikInput
                    type="email"
                    name="email"
                    formik={formik}
                    placeholder="Enter your email"
                />
                <FormikInput
                    type="password"
                    name="password"
                    formik={formik}
                    placeholder="Create your password"
                />
                <FormikInput
                    type="password"
                    name="passwordRepeat"
                    formik={formik}
                    placeholder="Repeat your password"
                />
                <FormikInput
                    type="url"
                    name="profilePicture"
                    formik={formik}
                    placeholder="Add your avatar picture URL..."
                />
                <button type="submit">Register</button>
            </form>
            {
                failedToRegister.name && <p>{failedToRegister.name}</p>
            }
            {
                failedToRegister.email && <p>{failedToRegister.email}</p>
            }
        </main>
     );
}
 
export default Register;