import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuestionsContext from '../../../context/QuestionsContext';

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

    useEffect(() => {
        fetch(`http://localhost:8081/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        </StyledQuestionPage>
     );
}
 
export default OneQuestion;