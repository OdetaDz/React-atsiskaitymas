import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UsersContext from "../../../context/UserContext";
import FormikInput from "../../UI/formikInput/FormikInput";
import bcrypt from "bcryptjs";

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
        <main>
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
        </main>
     );
}
 
export default LogIn;