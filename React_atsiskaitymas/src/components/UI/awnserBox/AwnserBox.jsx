import { useContext, useState, useEffect } from "react";
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";



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
        <div>
            <p>{data.awnser}</p>
            <div>
                <div>
                    {
                        data.edited ? <span>Edited: {data.modified}</span> : <span style={{width: "75px"}}></span>
                    }
                <span>{data.creatorUserName}</span>
                </div>
                <div>
                    <div>
                    {
                        loggedInUser &&
                        <>
                            <button onClick={Like}><i className="bi bi-hand-thumbs-up"></i></button>
                            <button onClick={Dislike}><i className="bi bi-hand-thumbs-down"></i></button>
                        </>
                    }
                    <span>Likes: {data.likes}</span>
                    </div>
                    {
                        loggedInUser.id === data.creatorId &&
                        <div>
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
                    <div>
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
            <div></div>
        </div>
     );
}
 
export default AwnserBox;