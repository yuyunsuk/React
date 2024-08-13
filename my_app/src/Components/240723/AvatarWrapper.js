import styled from "styled-components";
import { Avatar } from "./Avatar";

// grid
const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`;

const persons = [
    {name: "Steve" , job: "Programmer", country: "대한민국"},
    {name: "Tom"   , job: "Student"   , country: "USA"}     ,
    {name: "Adrian", job: "Engineer"  , country: "France"}  ,
    {name: "Max"   , job: "Painter"   , country: "Germany"} ,
];

// const {name, job, country} = 객체를 리턴하는 함수();
// const [x0, x1, x2] = 배열을 리턴하는 함수();

const colors = ["lightgreen","teal","lightgrey","khaki"];

export function AvatarWrapper() {

    const [number, setNumber] = func1(10);
    console.log("func1(10): " + number);
    
    setNumber(100);
    console.log("setNumber(100): " + number);
    
    setNumber(200);
    console.log("setNumber(200): " + number);

    return (
        <>
            <Container>
                {persons.map((p, i) => (
                    <Avatar person={p} bgcolor={colors[i]} />
                ))}
                <div>여기는 아바타의 맨 끝</div>
            </Container>
        </>
    );
}

function func1(value) {
    let number = value;
    function setNumber(newValue) {
        number = newValue;
    }
    return [number, setNumber];
}