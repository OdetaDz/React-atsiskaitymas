import styled from "styled-components";

const StyledFooter = styled.footer`
    height: 100px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
    font-family: 'Kalnia';
    font-size: 0.8rem;
    background-color: #cbc0d3;
`;

const Footer = () => {
    return ( 
        <StyledFooter>
            <p>&copy; {new Date().getFullYear()} ChAT in box</p>
        </StyledFooter>
     );
}
 
export default Footer;