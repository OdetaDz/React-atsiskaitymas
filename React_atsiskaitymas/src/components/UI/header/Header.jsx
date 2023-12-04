import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
    height: 100px;
    display: flex;
    justify-content: space-between;
`;

const Header = () => {
    return ( 
        <StyledHeader>
            <div>
                <img src="" alt="" />
            </div>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/questions/allQuestions">Questions</NavLink></li>
                </ul>
            </nav>
            <div>
                <ul>
                    <li>Sign In</li>
                    <li>Sign Up</li>
                </ul>
            </div>
        </StyledHeader>
     );
}
 
export default Header;