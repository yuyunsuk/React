import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
    width: 500px;
    text-align: center;
    margin: 0 auto;

    h1 {
        font-size: 4rem;
    }

    button {
        width: 100px;
        font-size: 2rem;
        margin: 10px;
    }
`;

export function CounterState() {

    // count 상태와 이를 변경할 함수를 useState를 통해 선언
    // useState를 사용하면 동적인 데이터를 효율적으로 관리하고 업데이트할 수 있으며, 실시간 반영이 가능하다
    // useState 사용하는 이유는 state 의 변화가 생기면 html도 자동으로 재렌더링해주기 때문
    // const [state, setState] = useState(initialValue)
    // 가상 DOM 을 사용, 실제 돔에 접근하여 조작하는 대신, 이것을 추상화시킨 자바스크립트 객체를 이용해 사용
    // Virtual DOM (VDOM)은 UI의 이상적인 또는 “가상”적인 표현을 메모리에 저장하고
    //    ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념, 이 과정을 재조정이라 함

    console.log("CounterState start.");

    // let count = 0;
    // 구조분해할당
    const [count, setCount] = useState(0); // 호출될때 count 가 업데이트 됨

    // 특정 이벤트를 등록하는 코드가 여기 있다면 여러번 등록이 되어 문제 발생
    // useEffect(function, 빈배열) 사용 한번만 등록

    // useEffect(function, deps)
    // function : 실행하고자 하는 함수, deps : 배열 형태. function을 실행시킬 조건.
    // deps에 특정값을 넣게 되면 컴포넌트가 mount 될 때, 지정한 값이 업데이트될 때 useEffect를 실행.

    // 1. Component가 Mount 되었을 때(나타날 때)
    //    useEffect(() => { console.log("맨 처음 렌더링될 때 한 번만 실행"); },[]);
    //    이벤트 함수 등록에 사용
    // 2. Component가 Update 되었을 때(props, state 변경)
    //    const mounted = useRef(false);
    //    useEffect(() => {
    //    if (!mounted.current) { mounted.current = true;
    //    } else { console.log(name); console.log("업데이트 될 때마다 실행"); }, [name]);
    // 3. Component가 Unmount 되었을 때(사라질 때) & Update 되기 직전에
    //    useEffect(() => { console.log("컴포넌트 나타남"); console.log(name);
    //       return () => { console.log("cleanUp 함수"); }; });

    // useEffect(() => {},[name]);
    // 화면 업데이트 이후에 호출됨, 가장 마지막 호출
    useEffect(() => {
        console.log("useEffect: " + count);
    }, [count]); // 매개변수 1은 콜백함수, 매개변수 2는 상태 의존성 배열

    function minus() {
        // count = count - 1;
        setCount(count - 1) // 업데이트할 값을 전달, 직접적으로 계산하거나 할당해서는 안됨
        console.log("minus count: " + count);
    }

    function plus() {
        // count = count + 1;
        setCount(count + 1) // 업데이트할 값을 전달, 직접적으로 계산하거나 할당해서는 안됨
        console.log("plus count: " + count);
    }

    console.log("CounterState end. count: " + count);

    useEffect(() => {
        // 빈 의존성배열의 의미는 컴포넌트가 처음 로드될때  딱 한번만 호출된다는 의미!
        // 각종 이벤트 콜백함수를 등록하는데 사용됨
    }, []);

    return (<>
        <Container>
            <h1>{count}</h1>
            <button onClick={minus}>-</button>
            <button onClick={plus}>+</button>
        </Container>
    </>);
}