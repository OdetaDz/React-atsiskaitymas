import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import { v4 as uuid} from 'uuid';
import bcrypt from 'bcryptjs';
import FormikInput from "../../UI/formikInput/FormikInput";

const StyledRegisterMain = styled.main`
    min-height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eee3e48b;

    > h1{
        font-family: 'Kalnia';
        font-weight: 600;
    }

    > form{
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        > div{
            width: 450px;

            > div:nth-child(1){
                display: grid;
                grid-template-columns: 1fr 2fr;

                > input{
                    height: 30px;
                    background-color: #ffffffc0;
                    border: 1px solid #39393936;
                    border-radius: 10px;
                }
            }

            > div:nth-child(2){
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        > button{
            border: 1px solid #39393936;
            border-radius: 10px;
            padding: 5px 10px;
            background-color: #cbc0d3a2;
            width: 100px;
            align-self: center;

            &:hover{
                background-color: #8e9aaf9a;
                cursor: pointer;
            }
        }
    }
`;
const Register = () => {

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
        avatar: ''
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
        avatar: Yup.string()
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
                    avatar: values.avatar
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
        <StyledRegisterMain>
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
                    name="avatar"
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
        </StyledRegisterMain>
     );
}
 
export default Register;