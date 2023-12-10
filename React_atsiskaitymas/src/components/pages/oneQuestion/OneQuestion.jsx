import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuestionsContext from '../../../context/QuestionsContext';
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";
import AwnserBox from "../../UI/awnserBox/AwnserBox";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

const StyledQuestionPage = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 200px);
`
const OneQuestion = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const { dispatchQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
    const { users, loggedInUser } = useContext(UsersContext);
    const { awnsers, setAwnsers, AwnsersActionTypes } = useContext(AwnsersContext);
    const [likesCount, setLikesCount] = useState('');
    
    useEffect(() => {
        fetch(`http://localhost:8081/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.name){
                    navigate('/');
                }
                setQuestion(data)
            })
    }, []);

    const AwnserValues = {
        awnser: ''
    };

    const AwnserValidationSchema = Yup.object({
        awnser: Yup.string()
            .max(500, "maximum 500 symbols for questions name")
            .required("This field must be filled")
            .trim()
    });

    const formik = useFormik({
        initialValues: AwnserValues,
        validationSchema: AwnserValidationSchema,
        onSubmit: (values) => {
            const finalValues = {
                id: uuid(),
                creatorId: loggedInUser.id,
                questionId: question.id,
                creatorUserName: loggedInUser.userName,
                ...values,
                likes: 0,
                edited: false,
                modified: ''
            }
            setAwnsers({
                type: AwnsersActionTypes.add,
                data: finalValues
            });
            formik.resetForm();
            
        }
    });

    const Like = () => {
        const newLikesCount = question.likes + 1;
        setLikesCount(newLikesCount);
        fetch(`http://localhost:8081/questions/${question.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: newLikesCount }),
        });
        setQuestion((prevQuestionData) => ({
            ...prevQuestionData,
            likes: newLikesCount,
          }));
      };
      const Dislike = () => {
        const newLikesCount = question.likes - 1;
        setLikesCount(newLikesCount);
        fetch(`http://localhost:8081/questions/${question.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: newLikesCount }),
        });
        setQuestion((prevQuestionData) => ({
            ...prevQuestionData,
            likes: newLikesCount,
          }));
      };

    return ( 
        question &&
        <StyledQuestionPage>
            <div>
                <div>
                    <button onClick={Like}>Like</button>
                    <button onClick={Dislike}>Dislike</button>
                    <span>Likes: {question.likes}</span>
                </div>
                <h1>{question.name}</h1>
                <p>{question.question}</p>
            </div>
            <div>
                {
                    question.edited ? <span>edited: {question.modified}</span> : <span style={{width: "75px"}}></span>
                }
                {
                    users.filter(user => user.id === question.creatorId).map(user => {
                        return <span>{user.userName}</span>
                    }) 
                }
            </div>
            <div>
                {
                    loggedInUser && question.creatorId === loggedInUser.id ?
                        <>
                            <button
                                onClick={() => navigate(`/questions/edit/${id}`)}
                            >Edit</button>
                            <button
                                onClick={() => {
                                    dispatchQuestions({ type: QuestionsActionTypes.delete, id: id });
                                    navigate("/questions/allQuestions")
                                }}
                            >Delete</button>
                        </> :
                        ''
                    }
            </div>
            <div>
                {
                    loggedInUser ? 
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <textarea
                                name="awnser"
                                id="awnser"
                                value={formik.values.awnser}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Write your awnser here..."
                            ></textarea>
                            {
                                formik.touched.awnser && formik.errors.awnser && 
                                <p style={{color:"red"}}>{formik.errors.awnser}</p>
                            }
                        </div>
                        <button type="submit"
                            onClick={() => navigate(`/questions/${id}`)}
                        >Add awnser</button>
                    </form>
                    :
                    <p>You need to sign in or sign up to awnser questions</p>
                }
            </div>
            <div>
                {
                    awnsers.filter(awnser => awnser.questionId === question.id).map(awnser => {
                        return <AwnserBox
                            key = {awnser.id}
                            data = {awnser}
                        />
                    })
                }
            </div>
        </StyledQuestionPage>
     );
}
 
export default OneQuestion;