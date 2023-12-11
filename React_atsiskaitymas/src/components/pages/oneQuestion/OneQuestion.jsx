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
    background-color: #eee3e48b;

    > div.questionPart {
        display: flex;
        flex-direction: column;
        width: 80%;

        > div.likesAndDate{
            display: flex;
            justify-content: space-between;
            padding-top: 10px;

            > div.likeDislike{
                display: flex;
                gap: 5px;

                > span:nth-child(1){
                    font-size: 1.2rem;

                    &:hover{
                        cursor: pointer;
                        color: #008000c1;
                    }
                }

                > span:nth-child(2){
                    font-size: 1.2rem;
            
                    &:hover{
                        cursor: pointer;
                        color: #da1a1ac1;
                    }
                }

                > span:nth-child(3){
                    font-size: 1.2rem;
                }
            }

            >div.date{

                > span{
                    color: #8e9aaf;
                    font-family: 'Kalnia';
                    font-size: 0.8rem;
                }
            }
        }

        > h1{
            font-family: 'Kalnia';
            font-weight: 500;
        }
        
        

        > div.editedAndUser{
            align-self: flex-end;
            color: #8e9aaf;
            
            > span:nth-child(2){
                padding-left: 10px;
            }
        }

        > div.editDelete{
            display: flex;
            gap: 10px;
            border-bottom: 1px solid #36363657;
            padding-bottom: 15px;

            > button{
                border: 1px solid #39393936;
                border-radius: 10px;
                padding: 5px 10px;
                background-color: #cbc0d3a2;

                &:hover{
                    background-color: #8e9aaf9a;
                    cursor: pointer;
                }
            }
        }
    }

    > div.addAwnser{
        padding: 10px 0;

        > form {
            display: flex;
            flex-direction: column;
            gap: 5px;

            > div > textarea{
                width: 500px;
                height: 70px;
                border: 1px solid #36363657;
                border-radius: 5px;
            }
            
            > button{
                align-self: center;
                border: 1px solid #39393936;
                border-radius: 10px;
                padding: 5px 10px;
                background-color: #cbc0d3a2;

                &:hover{
                    background-color: #8e9aaf9a;
                    cursor: pointer;
                }
            }
        }

        > p{
            font-family: 'Kalnia'; 
        }
    }

    > div.placefiller{
        height: 1px;
        width: 80%;
    }
    > div.awnsers{
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 80%;
        margin-bottom: 10px;
    }  
`;

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
                created: new Date().toISOString().slice(0,10),
                ...values,
                edited: false,
                modified: '',
                likes: 0
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
        })
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
            <div className="questionPart">
                <div className="likesAndDate">
                    <div className="likeDislike">
                        {
                            loggedInUser &&
                                <>
                                    <span onClick={Like}><i className="bi bi-hand-thumbs-up"></i></span>
                                    <span onClick={Dislike}><i className="bi bi-hand-thumbs-down"></i></span>
                                </>
                        }
                        <span>Likes: {question.likes}</span>
                    </div>
                <div className="date">
                    <span>Asked: {question.created}</span>
                </div>
                </div>
                <h1>{question.name}</h1>
                <p>{question.question}</p>
                <div className="editedAndUser">
                    {
                        question.edited ? <span>Edited: {question.modified}</span> : <span style={{width: "75px"}}></span>
                    }
                    {
                        users.filter(user => user.id === question.creatorId).map(user => {
                        return <span>{user.userName}</span>
                        }) 
                    }
                </div>
                <div className="editDelete">
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
            </div>
            <div className="addAwnser">
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
                    <p>You need to sign in or sign up to awnser questions :)</p>
                }
            </div>
            <div className="placefiller"></div>
            <div className="awnsers">
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