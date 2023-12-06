import { Formik } from "formik";
import  * as Yup from "yup";
import styled from "styled-components";
import FormikInput from "../../UI/formikInput/FormikInput";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import { useNavigate, useParams } from "react-router-dom";

const EditQuestion = () => {

    const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [ formValues, setFormValues ] = useState({
        name: '',
        question: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8081/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.name){
                    navigate('/');
                }
                setFormValues({
                    ...data
                });
            })
    }, []);
    const validationShcema = Yup.object({
        name: Yup.string()
            .max(50, "maximum 50 symbols for questions name")
            .required("This field must be filled")
            .trim(),
        question: Yup.string()
            .max(500, "Question can't be longer than 500 symbols")
            .required("This field must be filled")
            .trim()
    });

    return (
        <main>
            <h1>Edit your question</h1>
            {
                formValues.name && <Formik
                    initialValues = {formValues}
                    validationSchema = {validationShcema}
                    onSubmit = {(values) => {
                        const finalValues = {
                            ...values,
                            edited: true,
                            modified: new Date().toISOString().slice(0,10)
                        };
                        setQuestions({
                            type: QuestionsActionTypes.edit,
                            id: id,
                            data: finalValues
                        });
                        navigate(`/questions/${id}`);
                    }}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <FormikInput
                                type="text"
                                name="name"
                                formik={props}
                            >
                            </FormikInput>
                            <FormikInput
                                type="text"
                                name="question"
                                formik={props}
                            >
                            </FormikInput>
                            <button type="submit">Edit</button>
                        </form>
                    )}
                </Formik>
            }
        </main>
    );
}             

export default EditQuestion;