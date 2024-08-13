import styled from "styled-components";

const StyledButton = styled.button`
    width: 100px;
    height: 40px;
    padding: 10px 20px;
    font-size: 1.3rem;
    line-height: 8px;
    color: white;
    background-color: ${(props) => props.$bgcolor};
    border-radius: 10px;
`;

export function Button({bgcolor="gray", title="Click", func = () => {}}) { // Home 에서 버튼 제공 안하면, 기본 속성 제공
    return (<>
        <StyledButton $bgcolor={bgcolor} onClick={func}>
            {title}
        </StyledButton>
    </>);
}