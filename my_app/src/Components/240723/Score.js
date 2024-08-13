import styled from 'styled-components';

const Container = styled.div`
    width: 400px;
    margin: 0 auto;
    text-align: center;
`;

const Table = styled.div`
    display: grid;
    width: 300px;
    margin: 20px;
`;

export function Score ({
    firstName,
    score: {math, english, history},
    children
 }) {
    return (
        <Container>
            <h1>{firstName}'s Scores</h1>
            <Table>
                <tbody>
                    <tr>
                        <th>Subject</th>
                        <th>Score</th>
                    </tr>
                    <tr>
                        <td><h3>"Math"</h3></td>
                        <td><p>{math}</p></td>
                    </tr>
                    <tr>
                        
                        <td><h3>"English"</h3></td>
                        <td><p>{english}</p></td>
                    </tr>
                    <tr>
                        <td><h3>"History"</h3></td>
                        <td><p>{history}</p></td>
                    </tr>
                </tbody>
            </Table>
            {children}
        </Container>
    );
};
