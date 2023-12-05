import { useContext } from "react";
import QuestionsContext from "../../../context/QuestionsContext"
import OneQuestionCard from "../../UI/oneQuestionCard/OneQuestionCard";
import styled from "styled-components";
import UsersContext from "../../../context/UserContext";

const StyledQuetionsMain = styled.main`
    /* padding: 20px 40px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    div.questions{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        /* width: 80%; */
    }
`;

const AllQuestions = () => {

    const { questions } = useContext(QuestionsContext);
   

    return ( 
        <StyledQuetionsMain>
            <h1>All Questions</h1>
            <div className="questions">
                {
                    questions.map(question => {
                        return <OneQuestionCard
                            key = {question.id}
                            data = {question}
                        />
                    })
                }
            </div>
        </StyledQuetionsMain>
     );
}
 
export default AllQuestions;