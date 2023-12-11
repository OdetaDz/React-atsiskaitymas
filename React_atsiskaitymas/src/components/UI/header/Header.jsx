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
    background-color: #cbc0d3a2;

    > div.logo > a{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-decoration: none;
        color: black;

        > img{
        height: 70px;
        object-fit: contain;
        padding-left: 40px;
        }

        > span{
            padding-left: 20px;
            font-family: 'Kalnia';

            > b{
                font-weight: 700;
            }
        }
    }

    a.active{
        text-decoration: underline;
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
                    font-family: 'Kalnia';

                    &:hover{
                        background-color: #8e9aaf9a;
                        border-radius: 10px;
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
                        background-color: #8e9aaf9a;
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
                padding: 0 10px;
                font-family: 'Kalnia';
            }

            span:nth-child(3){
                background-color: unset;
                border: 1px solid #39393936;
                border-radius: 10px;
                padding: 5px 10px;

                &:hover{
                        background-color: #8e9aaf9a;
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
                <Link to="/">
                    <img src="https://static.thenounproject.com/png/1179223-200.png" alt="cat in a box logo"/>
                    <span><b>C</b>h<b>AT</b> in a box</span>
                </Link>
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