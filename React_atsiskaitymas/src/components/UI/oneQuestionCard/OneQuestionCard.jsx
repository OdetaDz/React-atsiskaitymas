import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";

const StyledQuestionDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    border: 1px solid #36363657;
    border-radius: 10px;
    box-shadow: 1px 2px#36363657;
    background-color: #8e9aaf20;
    width: 100%;

    > div.votes{
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        margin-top: 20px;

        > span{
            font-size: 0.8rem;
        }

        > span:nth-child(1){
            padding: 2px 5px;
            border-radius: 5px;
        }

        > span:nth-child(3){
            color: #8e9aaf;
        }
    }

    > div > div.question{
        h1{
            font-size: 1.3rem;
            font-weight: 600;
            font-family: 'Kalnia';
            
            a{
                text-decoration: none;
                color: black;

                &:hover{
                    color: #8e9aaf;
                }
            }
        }
    }

    > div > div.creator{
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 10px;

        > span:nth-child(1){
            font-size: 0.8rem;
            color: #8e9aaf;
        }

        > span:nth-child(2){
            font-size: 0.8rem;
            color: #8e9aaf;
            padding-right: 10px;
            font-family: 'Kalnia'
        }
    }
`;

const OneQuestionCard = ({ data }) => {

    const { users } = useContext(UsersContext); 
    const { awnsers } = useContext(AwnsersContext);
    const skaicius = awnsers.filter(awnser => awnser.questionId === data.id).length;
    const backgroundColor =
    data.likes > 0 ? "#0080003b" : data.likes < 0 ? "#da1a1a3b" : "transparent";

    return ( 
        <StyledQuestionDiv>
            <div className="votes">
                <span style={{ backgroundColor }}>Votes: {data.likes}</span>
                <span>Comments: {skaicius}</span>
                <span>Asked: {data.created}</span>
            </div>
            <div>
                <div className="question">
                    <h1><Link to={`/questions/${data.id}`}>{data.name}</Link></h1>
                    <p>{data.question.substring(0, 100)}...</p>
                </div>
                <div className="creator">
                    {
                        data.edited ? <span>edited: {data.modified}</span> : <span style={{width: "75px"}}></span>
                    }
                    {
                        users.filter(user => user.id === data.creatorId).map(user => {
                            return <span>{user.userName}</span>
                        })
                    }
                    
                </div>
            </div>
        </StyledQuestionDiv>
     );
}
 
export default OneQuestionCard;