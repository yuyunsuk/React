// import "./Test1.css";
import styled from "styled-components";

const Box = styled.div`
    width: 300px;
    height: 300px;
    background-color: dodgerblue;
    margin: auto;
`;

export function Test1() {
    return (
    <>
        <Box>Test1</Box>
    </>
    );
}