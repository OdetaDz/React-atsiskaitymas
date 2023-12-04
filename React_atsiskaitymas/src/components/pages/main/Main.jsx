import styled from "styled-components";

const StyledMain = styled.main`
    height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1701648000&semt=sph');
    background-color: #ffffff44;
    background-blend-mode: overlay;
    background-size: cover;
    background-position: center;

    h1{
        text-align: center;
    }
`

const Main = () => {
    return ( 
        <StyledMain>
            <h1>Do you have any questions about life? Ask them here and get your awnsers....</h1>
        </StyledMain>
     );
}
 
export default Main;