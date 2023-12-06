import { useContext, useState } from "react";
import UsersContext from "../../../context/UserContext";
import AwnsersContext from "../../../context/AwnsersContext";
import { useNavigate } from "react-router-dom";
import FormikInput from "../formikInput/FormikInput";

const AwnserBox = ({ data }) => {

    const { loggedInUser } = useContext(UsersContext);
    const { setAwnsers, AwnsersActionTypes } = useContext(AwnsersContext);
    const navigate = useNavigate();
    const [ editClick, setEditClick ] = useState(false);
    
    return ( 
        <div>
            <p>{data.awnser}</p>
            <div>
                <span>{data.creatorUserName}</span>
                {
                    data.edited ? <span>Edited: {data.modified}</span> : <span style={{width: "75px"}}></span>
                }
                {
                    loggedInUser.id === data.creatorId &&
                    <div>
                        <button
                            onClick={() => { setEditClick(true)}}
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
                {
                    editClick ? <p>veikia</p> : <p>neveikia</p>
                }
            </div>
        </div>
     );
}
 
export default AwnserBox;