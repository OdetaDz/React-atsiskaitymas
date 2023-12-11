import { useContext, useState, useEffect } from "react";
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

const StyledAwnserBox = styled.div`
    border: 1px solid #36363657;
    border-radius: 10px;
    box-shadow: 1px 2px#36363657;
    background-color: #8e9aaf20;
    padding: 10px;

    > div.user{
        display: flex;
        gap: 10px;
        justify-content: space-between;

        > span:nth-child(1){
            color: #8e9aaf;
            font-size: 0.8rem;
        }

        > span:nth-child(2){
            color: #8e9aaf;
            font-size: 0.8rem;
            font-family: 'Kalnia';
            padding-bottom: 5px;
        }
    }
    > div{
        
        > div.creatorAndEdited{
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            gap: 5px;
            
            > span:nth-child(1){
                color: #8e9aaf;
                font-size: 0.8rem;
            }
        }

        > div.likesAndCreatorsButtons{
            display: flex;
            justify-content: space-between;
            padding: 5px 0;

            > div.likesDislikes{
                display: flex;
                gap: 8px;

                > span:nth-child(2){
                    font-size: 1.1rem;

                    &:hover{
                        cursor: pointer;
                        color: #008000c1;
                    }
                }

                > span:nth-child(3){
                    font-size: 1.1rem;

                    &:hover{
                        cursor: pointer;
                        color: #da1a1ac1;
                    }
                }

                > span:nth-child(3){
                    
                }
            }

            > div.editDelete{
                display: flex;
                gap: 5px;

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

        > div.editForm{
            > form{
                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: center;

                > textarea{
                    width: 60%;
                    height: 70px;
                    border: 1px solid #36363657;
                    border-radius: 5px;
                    background-color: #ffffff6b;
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
        }
    }
`;

const AwnserBox = ({ data }) => {

    const { loggedInUser } = useContext(UsersContext);
    const { awnsers, setAwnsers, AwnsersActionTypes } = useContext(AwnsersContext);
    const [ awnser, setAwnser] = useState('');
    const navigate = useNavigate();
    const [ editClick, setEditClick ] = useState(false);
    const [likesCount, setLikesCount] = useState('');
    const [ formValues, setFormValues ] = useState({
        awnser: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8081/awnsers/${data.id}`)
            .then(res => res.json())
            .then(data => {
                if(!data.awnser){
                    navigate('/');
                }
                setAwnser(data);
                setFormValues({
                    ...data
                });
            })
    }, []);

    const validationSchema = Yup.object({
        awnser: Yup.string()
            .max(500, "maximum 500 symbols for questions name")
            .required("This field must be filled")
            .trim()
    });

    const Like = () => {
            const newLikesCount = ++data.likes;
      
            fetch(`http://localhost:8081/awnsers/${data.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ likes: newLikesCount }),
            })
                .then(res => res.json)
                .then(updatedAwnser => {
                    setAwnser((prevData) => ({
                        ...prevData,
                        likes: updatedAwnser.likes,
                    }));
                })
        };
      
      const Dislike = () => {
        const newLikesCount = --data.likes;
      
        fetch(`http://localhost:8081/awnsers/${data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: newLikesCount }),
        })
        .then(res => res.json)
                .then(updatedAwnser => {
                    setAwnser((prevData) => ({
                        ...prevData,
                        likes: updatedAwnser.likes,
                    }));
                })
      };

    return ( 
        <StyledAwnserBox>
            <p>{data.awnser}</p>
            <div className="user">
                <span>Awnsered: {data.created}</span>
                <span>{data.creatorUserName}</span>
            </div>
            <div>
                <div className="creatorAndEdited">
                    {
                        data.edited ? <span>Edited: {data.modified}</span> : <span style={{width: "75px"}}></span>
                    }
                </div>
                <div className="likesAndCreatorsButtons">
                    <div className="likesDislikes">
                        <span>Likes: {data.likes}</span>
                        {
                            loggedInUser &&
                                <>
                                    <span onClick={Like}><i className="bi bi-hand-thumbs-up"></i></span>
                                    <span onClick={Dislike}><i className="bi bi-hand-thumbs-down"></i></span>
                                </>
                        }
                    </div>
                    {
                        loggedInUser.id === data.creatorId &&
                            <div className="editDelete">
                                <button
                                    onClick={() => 
                                    setEditClick(true)
                                    }
                                >Edit</button>
                                <button
                                    onClick={() => {
                                    setAwnsers({ type: AwnsersActionTypes.delete, 
                                    id: data.id});
                                    navigate(`/questions/${data.questionId}`)
                                    }}
                                >Delete</button>
                            </div>
                    }
                </div>
                {
                    editClick && 
                    <div className="editForm">
                        {
                            formValues.awnser && <Formik
                                initialValues = {formValues}
                                validationSchema = {validationSchema} 
                                onSubmit = {(values) => {
                                const finalValues = {
                                    ...values,
                                    edited: true,
                                    modified: new Date().toISOString().slice(0,10)
                                };
                                setAwnsers({
                                    type: AwnsersActionTypes.edit,
                                    id: data.id,
                                    data: finalValues
                                });
                                setEditClick(false);
                            
                                }}
                            >
                                {(props) => (
                                    <form onSubmit={props.handleSubmit}>
                                        <textarea
                                            name="awnser"
                                            id="awnser"
                                            value={props.values.awnser}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            placeholder="Edit your awnser here..."
                                        ></textarea>
                                        <button type="submit">Edit</button>
                                    </form>
                                )}
                            </Formik>
                        }
                    </div>
                }
            </div>
        </StyledAwnserBox>
    );
}
 
export default AwnserBox;