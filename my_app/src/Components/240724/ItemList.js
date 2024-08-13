import { useState } from "react";

export function ItemList() {
    const [Items, setItems] = useState([]); // 배열 초기값 빈배열
    const [newInputItem, setNewInputItem] = useState(""); // 문자열 초기값 ""

    function addItem() {
        const temp = [...Items, newInputItem];
        setItems(temp);
        setNewInputItem("");
    }

    return (
        <>
            <input
                placeholder="물품이름을 입력하세요"
                onChange={(e) => {
                    // Key 를 입력할때 마다 이벤트 발생, 문자를 입력할때 마다 렌더링이 발생, 해당 콤포넌트 호출, 매번 onChange 가 호출됨
                    setNewInputItem(e.target.value);
                    console.log("input onChange: " + e.target.value);
                }}
                value={newInputItem} // value 는 창에 보이는 값
            />
            <button onClick={addItem}>물품추가</button>
            <h3>물품 목록</h3>
            <ul>
                {/* ItemList.js:25 Warning: Each child in a list should have a unique "key" prop. => key 값으로 id 혹은 unique index 값을 넣어줘야 함 */}
                {Items.map((item, index) => (
                    <li key={index}>{item}</li>
                    // 리엑트가 리스트 관리목적으로 key 속성을 필요로 함
                    // items 가 DB의 table 정보라면 해당 테이블의 id컬럼을 대신 입력하는 것이 좋음
                    // 예) <li key={item.id}>{item}</li>
                ))}
            </ul>
        </>
    );
}
