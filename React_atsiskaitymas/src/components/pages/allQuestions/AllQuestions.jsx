import { useContext } from "react";
import QuestionsContext from "../../../context/QuestionsContext"
import OneQuestionCard from "../../UI/oneQuestionCard/OneQuestionCard";
import styled from "styled-components";
import UsersContext from "../../../context/UserContext";
import { Link } from "react-router-dom";

const StyledQuetionsMain = styled.main`
    /* padding: 20px 40px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > div.questions{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        width: 80%;
    }
`;

const AllQuestions = () => {

    const { questions } = useContext(QuestionsContext);
    const { loggedInUser } = useContext(UsersContext);
   

    return ( 
        <StyledQuetionsMain>
            <h1>All Questions</h1>
            {
                loggedInUser && <Link to="/questions/addNew">
                    <button>Ask a question</button>
                </Link>
            }
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