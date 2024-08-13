import styled from "styled-components";

const Li = styled.li`
    list-style: none;
    color: lightcoral;
`;

const Container = styled.div`
    width: 100vw;
    margin: 0 auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2rem;
`;

const Photo = styled.img`
    border-radius: 50%;
    width: 300px;
    height: 300px;
`;

// 보통 props 로 받아옴
// 구조분해할당을 통하여 props => {products, user} 로 변경함
export function List({products, user}) {

    // // Javascript 코딩 영역
    // const products = [
    //     {title: "Banana"},
    //     {title: "Apple"},
    //     {title: "Grape"},
    // ];

    // // https://i.imgur.com/WohslsL_d.webp?maxwidth=520&shape=thumb&fidelity=high
    // const user = {
    //     name: "Hedy Lamarr",
    //     imageUrl: "https://i.imgur.com/WohslsL.png"
    // }

    /* <li>Banana</li>
       <li>Apple</li>
       <li>Grape</li> */

    return (
    <>
        <h1>List Components</h1>
        <p>리액트 연습 코드</p>
        <ul>
            {
                products.map((p)=> (
                    <Li>{p.title}</Li>
                ))
            }
        </ul>
        <Container>
            <Title>{user.name}</Title>
            <Photo src={user.imageUrl} />
        </Container>
    </>);
}