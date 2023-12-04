import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
`

const Footer = () => {
    return ( 
        <StyledFooter>
            <p>&copy; {new Date().getFullYear()} by Odeta Džiugytė</p>
        </StyledFooter>
     );
}
 
export default Footer;