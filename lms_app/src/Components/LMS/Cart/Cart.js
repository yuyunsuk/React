import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../Api/UserApi/UserApi";

export function Cart() {
  const [cart, setCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    cartList();
  }, []);

  // 장바구니 리스트
  async function cartList() {
    let userId;
    let cartList;
    try {
      const SessionData = await getCurrentUser();
      userId = SessionData.userId;
      cartList = JSON.parse(localStorage.getItem(userId));
      setCart(cartList);
    } catch (error) {
      console.log("Cart List Error");
    }
  }

  const handleCheckboxChange = (lectureId) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(lectureId)) {
        return prevCheckedItems.filter((id) => id !== lectureId);
      } else {
        return [...prevCheckedItems, lectureId];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cart.map((item) => item.lectureId));
    }
    setSelectAll(!selectAll);
  };

  async function cartRemove() {
    // 사용자에게 삭제 확인 대화상자 표시
    const confirm = window.confirm("정말로 선택된 항목을 삭제하시겠습니까?");
    if (!confirm) {
      return; // 사용자가 취소를 클릭하면 삭제를 중단
    }

    try {
      const SessionData = await getCurrentUser();
      const userId = SessionData.userId;
      let cartList = JSON.parse(localStorage.getItem(userId)) || [];

      // 체크된 항목을 필터링하여 삭제
      cartList = cartList.filter(
        (item) => !checkedItems.includes(item.lectureId)
      );

      // localStorage와 상태 업데이트
      localStorage.setItem(userId, JSON.stringify(cartList));
      setCart(cartList);
      setCheckedItems([]);
      setSelectAll(false);
    } catch (error) {
      console.log("Remove Error", error);
    }
  }

  return (
    <>
      <p>　</p>
      <p>*CartList*</p>
      <div>
        {cart.length > 0 ? (
          <>
            <div>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
              />
              <label>전체 선택</label>
            </div>
            {cart.map((lecture, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={checkedItems.includes(lecture.lectureId)}
                  onChange={() => handleCheckboxChange(lecture.lectureId)}
                />
                <p>Lecture ID: {lecture.lectureId}</p>
              </div>
            ))}
          </>
        ) : (
          <p>장바구니가 비었습니다.</p>
        )}
      </div>

      <p>　</p>
      <p>*CartRemove*</p>
      <button onClick={cartRemove}>삭제</button>
    </>
  );
}
