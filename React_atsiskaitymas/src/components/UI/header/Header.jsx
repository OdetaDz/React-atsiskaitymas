import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../context/UserContext";
import { setLocale } from "yup";

const StyledHeader = styled.header`
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 20px;

    div.logo > img{
        height: 90px;
    }

    a.active{
        background-color: #ffc0cb88;
        border-radius: 5px;
    }
    nav{
        display: flex;
        align-items: center;
        justify-content: center;
        ul{
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            gap: 10px;
            li{
                a{
                    text-decoration: none;
                    padding: 5px 10px;
                    color: black;

                    &:hover{
                        background-color: #80008036;
                        border-radius: 5px;
                    }
                }
            }
        }
    }

    div.userLogin {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        ul{
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            flex-direction: column;
            gap: 5px;

            li{
                a{
                    text-decoration: none;
                    padding: 5px 10px;
                    border: 1px solid #39393936;
                    border-radius: 10px;
                    color: black;
                    display: block;

                    &:hover{
                        background-color: #80008036;
                    }
                }
            }
        }

        div.user{
            display: flex;
            gap: 10px;
            align-items: center;
            justify-content: flex-end;

            img{
                height: 60px;
                width: 60px;
                border-radius: 50%;
                object-position: center;
                object-fit: cover;
                border: 1px solid #39393936;
            }

            span:nth-child(2){
                font-weight: 600;
            }

            span:nth-child(3){
                background-color: unset;
                border: 1px solid #39393936;
                border-radius: 10px;
                padding: 5px 10px;

                &:hover{
                        background-color: #80008036;
                        cursor: pointer;
                    }
            }
        }
    }
`;

const Header = () => {

    const { loggedInUser, setLoggedInUser} = useContext(UsersContext);
    const navigate = useNavigate();

    return ( 
        <StyledHeader>
            <div className="logo">
                <img src="https://i.pinimg.com/736x/c3/2c/a8/c32ca8188b7fd323fa153959d92fd453.jpg" alt="cat logo"/>
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/"
                        className={({ isActive })=> isActive ? 'active' : ''}
                    >Home</NavLink></li>
                    <li><NavLink to="/questions/allQuestions"
                        className={({ isActive })=> isActive ? 'active' : ''}
                    >Questions</NavLink></li>
                </ul>
            </nav>
            <div className="userLogin">
                {
                    !loggedInUser ?
                    <ul>
                        <li><Link to="/user/login">Sign In</Link></li>
                        <li><Link to="/user/register">Sign Up</Link></li>
                    </ul> :
                    <div className="user">
                        <img src={loggedInUser.avatar} alt={`${loggedInUser.userName} profile picture`}/>
                        <span>{loggedInUser.userName}</span>
                        <span onClick={() => {
                            setLoggedInUser('');
                            navigate('/');
                        }}>Log Out</span>
                    </div>
                }
            </div>
        </StyledHeader>
     );
}
 
export default Header;