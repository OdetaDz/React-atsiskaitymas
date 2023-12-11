import { useFormik } from "formik";
import  * as Yup from "yup";
import styled from "styled-components";
import FormikInput from "../../UI/formikInput/FormikInput";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import QuestionsContext from "../../../context/QuestionsContext";
import UsersContext from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const StyledAddQuestion = styled.main`
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
        <StyledAddQuestion>
            <h1>Add your question</h1>
            <form onSubmit={formik.handleSubmit}>
                <FormikInput
                    type="text"
                    name="name"
                    formik={formik}
                    placeholder="Write your question name here..."
                >
                </FormikInput>
                <div>
                    <div>
                        <label for="question">Question:</label>
                        <textarea
                            name="question"
                            id="question"
                            value={formik.values.question}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Write your question here..."
                            
                        >
                        </textarea>
                    </div>
                    <div>
                        {
                            formik.touched.question && formik.errors.question && 
                            <div>
                                <p style={{ color: "red"}}>{formik.errors.question}</p>
                            </div>
                        }
                    </div>
                </div>
                <button type="submit">Add</button>
            </form>
        </StyledAddQuestion>
    )
}

export default AddQuestion;