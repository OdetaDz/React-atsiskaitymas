import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import FormikInput from "../../UI/formikInput/FormikInput";
import bcrypt from "bcryptjs";

const StyledLoginMain = styled.main`
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eee3e48b;

    > h1{
        font-family: 'Kalnia';
        font-weight: 600;
    }

    > form{
        display: flex;
        flex-direction: column;
        gap: 10px;

        > div{
            width: 300px;
            display: flex;
            flex-direction: column;

            > div:nth-child(1){
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 5px;

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
const LogIn = () => {

    const navigate = useNavigate();
    const { users, setLoggedInUser } = useContext(UsersContext);
    const [failedToLogin, setFailedToLogin] = useState(false);

    const formvalues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string()
          .email('This field must be a valid email')
          .required('This field must be filled')
          .trim(),
        password: Yup.string()
          .required('This field must be filled')
          .trim()
      });

      const formik = useFormik({
        initialValues: formvalues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const loggedInUser = users.find(user => user.email === values.email && bcrypt.compareSync(values.password, user.password)); 

            if(loggedInUser === undefined){
                setFailedToLogin(true);
            } else {
                setLoggedInUser(loggedInUser);
                navigate('/');
            }
        }
      });

    return ( 
        <StyledLoginMain>
            <h1>Log In</h1>
            <form onSubmit={formik.handleSubmit}>
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
                    placeholder="Enter your password"
                />
                <button type="submit">Login</button>
            </form>
            {
                failedToLogin && <p>No user with such credentials</p>
            }
        </StyledLoginMain>
     );
}
 
export default LogIn;