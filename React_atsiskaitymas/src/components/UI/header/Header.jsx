import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
    height: 100px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
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
        ul{
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            flex-direction: column;
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
`;

const Header = () => {

    

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
                <ul>
                    <li><Link>Sign In</Link></li>
                    <li><Link>Sign Up</Link></li>
                </ul>
            </div>
        </StyledHeader>
     );
}
 
export default Header;