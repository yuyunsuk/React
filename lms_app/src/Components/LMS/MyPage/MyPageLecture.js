import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../Styles/MyPageUser.css";

export function MyPageLecture() {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/user/current"
                );
                const authorityName = response.data.authority[0].authority;
                if (authorityName === "ROLE_ADMIN") {
                    // Handle admin specific logic
                }
                const userResponse = await axios.get(
                    `http://localhost:8080/user/id/${response.data.userId}`
                );
                setUserData(userResponse.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("로그인해주세요.");
                // window.location.href = "http://localhost:8080/lms/main.html";
                window.location.href = "http://localhost:3000/home";
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async () => {
        if (window.confirm("회원정보를 변경하시겠습니까?")) {
            try {
                await axios.put("http://localhost:8080/user/userset", {
                    ...userData,
                    updatedAt: new Date(),
                    receiveEmailYn: userData.receiveEmailYn ? "Y" : "N",
                    receiveSmsYn: userData.receiveSmsYn ? "Y" : "N",
                    receiveAdsPrPromoYn: userData.receiveAdsPrPromoYn
                        ? "Y"
                        : "N",
                });
                window.location.reload();
            } catch (error) {
                console.error("Update error:", error);
            }
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="root">
                <div className="userInfo-box">
                    <h2 className="userInfoBoxTitle">회원정보</h2>
                    <div className="userGridContainer">
                        <div className="userGrid userGrid1">아이디</div>
                        <div className="userGrid userGrid2">
                            <div className="idGrid">{userData.userId}</div>
                        </div>
                        {/* Render other fields similarly */}
                        <div className="userDataUpdateBtnBox">
                            {isEditing ? (
                                <>
                                    <button onClick={() => setIsEditing(false)}>
                                        취소
                                    </button>
                                    <button onClick={handleUpdate}>
                                        수정완료
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setIsEditing(true)}>
                                    정보수정
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageLecture;
