import { Formik } from "formik";
import  * as Yup from "yup";
import styled from "styled-components";
import FormikInput from "../../UI/formikInput/FormikInput";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import { useNavigate, useParams } from "react-router-dom";

const StyledQuestionEdit = styled.main`
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
        gap: 10px;
        width: 600px;

        > div{ 

            > div:nth-child(1){
                display: grid;
                grid-template-columns: 1fr 3fr;

                > input{
                    height: 30px;
                    background-color: #ffffffc0;
                    border: 1px solid #39393936;
                    border-radius: 10px;
                }

                > textarea{
                    height: 70px;
                    border: 1px solid #36363657;
                    border-radius: 10px;
                    background-color: #ffffffc0;
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
        <StyledQuestionEdit>
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
                            <div>
                                <div>
                                    <label for="question">Question:</label>
                                    <textarea
                                        name="question"
                                        id="question"
                                        value={props.values.question}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        placeholder="Edit your question here..."
                                    >
                                    </textarea>
                                </div>
                                <div>
                                    {
                                        props.touched.question && props.errors.question && 
                                        <div>
                                            <p style={{ color: "red"}}>{props.errors.question}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <button type="submit">Edit</button>
                        </form>
                    )}
                </Formik>
            }
        </StyledQuestionEdit>
    );
}             

export default EditQuestion;