import styled from "styled-components";

const StyledMain = styled.main`
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eee3e48b;
    background-position: center;

    h4, p{
        font-size: 1.3rem;
    }
    img {
        height: 200px;
    }
`;

const Main = () => {
    return ( 
        <StyledMain>
            <h4>"ChAT in a box" is a place where you can ask all the questions that you have...</h4>
            <p>Ask away and get response from others...</p>
            <img src="https://cdn.icon-icons.com/icons2/3546/PNG/512/cat_support_mark_question_icon_224690.png" alt="question cat"/>

        </StyledMain>
     );
}
 
export default Main;