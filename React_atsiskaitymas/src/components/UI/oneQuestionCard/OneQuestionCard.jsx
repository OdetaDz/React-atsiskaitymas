import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledQuestionDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    border-top: 1px solid #36363657;
    width: 100%;

    div.votes{
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        margin-top: 20px;
    }

    div.question{
        h1{
            font-size: 1.3rem;
            font-weight: 600;
            
            a{
                text-decoration: none;
                color: black;

                &:hover{
                    color: pink;
                }
            }
        }
    }

    div.creator{
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
`;

const OneQuestionCard = ({ data }) => {
    return ( 
        <StyledQuestionDiv>
            <div className="votes">
                <span>votes</span>
                <span>comments</span>
            </div>
            <div>
                <div className="question">
                    <h1><Link to={`/questions/${data.id}`}>{data.name}</Link></h1>
                    <p>{data.question.substring(0, 100)}...</p>
                </div>
                <div className="creator">
                    <span>creator</span>
                    <span>modified</span>
                </div>
            </div>
        </StyledQuestionDiv>
     );
}
 
export default OneQuestionCard;