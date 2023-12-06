import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuestionsContext from '../../../context/QuestionsContext';
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";
import AwnserBox from "../../UI/awnserBox/AwnserBox";

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
    const {setQuestions, QuestionsActionTypes} = useContext(QuestionsContext);
    const { users, loggedInUser } = useContext(UsersContext);
    const { awnsers } = useContext(AwnsersContext);


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

    return ( 
        question &&
        <StyledQuestionPage>
            <div>
                <h1>{question.name}</h1>
                <p>{question.question}</p>
            </div>
            <div>
                {
                    question.edited ? <span>edited: {question.modified}</span> : <span style={{width: "75px"}}></span>
                }
                {
                    users.filter(user => user.id === question.creatorId).map(user => {
                        return <span key={user.id}>{user.userName}</span>
                    }) 
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