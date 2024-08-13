import styled from "styled-components";

/* background-color: lightgreen; */
const Container = styled.div`
    box-sizing: border-box;
    width: 300px;
    background-color: ${(props) => props.bgcolor};
    box-shadow: 1px 2px 5px gray;
    padding: 10px;
    margin-bottom: 20px;
`;

const Bold = styled.p`
    font-weight: 700;
    font-size: 2rem;
    color: dodgerblue;
`;

export function Avatar({person: {name, job, country}, bgcolor}) {
    return (
    <>
        <Container bgcolor = {bgcolor} >
            <div>
                <Bold>
                    {name}
                </Bold>
                <p>
                    {job}
                </p>
                <p>
                    {country}
                </p>
                <hr />
            </div>
        </Container>
    </>);
}
