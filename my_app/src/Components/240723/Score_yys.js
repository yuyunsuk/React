import styled from 'styled-components';

const Table = styled.table`
    border-collapse: collapse;
    width: 300px;
    margin: 20px;
`;

const Th = styled.th`
    border: 1px solid black;
    padding: 8px;
    text-align: left;
`;

const Td = styled.td`
    border: 1px solid black;
    padding: 8px;
    text-align: left;
`;

export function Score ({ firstName, score }) {
    return (
        <div>
            <h2>{firstName}'s Scores</h2>
            <Table>
                <tbody>
                    <tr>
                        <Th>Subject</Th>
                        <Th>Score</Th>
                    </tr>
                    {Object.keys(score).map((subject) => (
                        <tr>
                            <Td>{subject}</Td>
                            <Td>{score[subject]}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
