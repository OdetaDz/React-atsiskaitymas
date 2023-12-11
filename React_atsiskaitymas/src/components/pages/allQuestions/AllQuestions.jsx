import { useContext, useState } from "react";
import QuestionsContext from "../../../context/QuestionsContext"
import OneQuestionCard from "../../UI/oneQuestionCard/OneQuestionCard";
import styled from "styled-components";
import UsersContext from "../../../context/UserContext";
import { Link } from "react-router-dom";


const StyledQuetionsMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;
    background-color: #eee3e48b;

    > h1{
        font-family: 'Kalnia';
        font-weight: 500;
        margin-bottom: 7px;
    }

    > div.addNew{
        width: 80%;
        display: flex;
        justify-content: end;

        > span{
            
            > a{
                text-decoration: none;
                padding: 5px 10px;
                border: 1px solid #39393936;
                background-color: #cbc0d3a2;
                border-radius: 10px;
                color: black;
                display: block;

                &:hover{
                    background-color: #8e9aaf9a;
                }
            }
        }
    }

    > div.sort{
        width: 80%;
        justify-self: start;
        margin-bottom: 7px;

        > span{
            padding-right: 15px;
            font-family: 'Kalnia';
            font-weight: 500;
        }

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
    > div.questions{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 80%;
        padding-bottom: 10px;
    }
`;

const AllQuestions = () => {

    const { questions } = useContext(QuestionsContext);
    const { loggedInUser } = useContext(UsersContext);
    const [ sortByDate, setSortByDate ] = useState(false);

    return ( 
        <StyledQuetionsMain>
            <h1>All Questions</h1>
            {
                loggedInUser && 
                    <div className="addNew">
                        <span><Link to="/questions/addNew">Ask a question</Link></span>
                    </div>
                
            }
            <div className="sort">
                <span>Sort by:</span>
                <button
                    onClick={() => {setSortByDate(!sortByDate)}}
                >{sortByDate ? "Oldest" : "Newest"}</button>
            </div>
            <div className="questions">
                {
                    sortByDate ? 
                    questions.slice().sort((a, b) => new Date(a.created) - new Date(b.created)).map(question => (
                        <OneQuestionCard
                            key={question.id}
                            data={question}
                        />
                    ))
                    :
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