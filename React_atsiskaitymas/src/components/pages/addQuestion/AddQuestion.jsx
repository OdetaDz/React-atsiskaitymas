import { useFormik } from "formik";
import  * as Yup from "yup";
import styled from "styled-components";
import FormikInput from "../../UI/formikInput/FormikInput";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import UsersContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddQuestion = () => {

    const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);

    const { loggedInUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const values = {
        name: '',
        question: '',
    };

    const validationScema = Yup.object({
        name: Yup.string()
            .max(50, "maximum 50 symbols for questions name")
            .required("This field must be filled")
            .trim(),
        question: Yup.string()
            .max(500, "Question can't be longer than 500 symbols")
            .required("This field must be filled")
            .trim()
    });

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationScema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                creatorId: loggedInUser.id,
                ...values,
                created: new Date().toISOString().slice(0,10),
                edited: false,
                modified: '',
                likes: ''
            }
            setQuestions({
                type: QuestionsActionTypes.add,
                data: finalValues
            });
            navigate('/questions/allQuestions');
        }
    })

    return(
        <main>
            <h1>Add your question</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput
                    type="text"
                    name="name"
                    formik={formik}
                >
                </FormikInput>
                <FormikInput
                    type="text"
                    name="question"
                    formik={formik}
                >
                </FormikInput>
                <button type="submit">Add</button>
            </form>
        </main>
    )
}

export default AddQuestion;