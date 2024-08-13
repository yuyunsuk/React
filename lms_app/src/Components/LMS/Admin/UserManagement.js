import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../Styles/mgmt_user.css";
import "../../../Styles/pagination.css";
import Modal from "./Modal";

export function UserManagement() {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const COUNT_PER_PAGE = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/admin/getAllUsers`
                );
                const totalUsers = response.data;
                setTotalPages(Math.ceil(totalUsers.length / COUNT_PER_PAGE));
                setUsers(
                    totalUsers.slice(
                        (currentPage - 1) * COUNT_PER_PAGE,
                        currentPage * COUNT_PER_PAGE
                    )
                );
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleUpdateAuthority = async (userId, authorityName) => {
        try {
            const response = await axios.put(
                "http://localhost:8080/user/updateAuthority",
                { userId, authorityName }
            );
            if (response.data === "success") {
                setModalContent("권한이 변경되었습니다.");
            } else {
                setModalContent("업데이트가 실패하였습니다.");
            }
            setModalOpen(true);
        } catch (error) {
            console.error("Error updating authority:", error);
            setModalContent("업데이트 도중 오류가 발생했습니다.");
            setModalOpen(true);
        }
    };

    return (
        <div className="main-content">
            <div className="main-top">
                <div className="search-box">
                    <label className="search label">성명조회</label>
                    <input
                        type="text"
                        className="search input"
                        placeholder="Search by Name"
                    />
                    <button className="search button">조회</button>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>회원ID</th>
                                <th>회원Name</th>
                                <th>회원Email</th>
                                <th>회원여부(탈퇴:N)</th>
                                <th>회원권한</th>
                                <th>수정할권한</th>
                                <th>업데이트</th>
                            </tr>
                        </thead>
                        <tbody className="user_list">
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <td>{user.userId}</td>
                                    <td>{user.userNameKor}</td>
                                    <td>{user.email}</td>
                                    <td>{user.actYn}</td>
                                    <td>{user.authority.authorityName}</td>
                                    <td>
                                        <select
                                            defaultValue={
                                                user.authority.authorityName
                                            }
                                        >
                                            <option value="ROLE_ADMIN">
                                                ROLE_ADMIN
                                            </option>
                                            <option value="ROLE_TEACHER">
                                                ROLE_TEACHER
                                            </option>
                                            <option value="ROLE_USER">
                                                ROLE_USER
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            className="updateBtn"
                                            onClick={() =>
                                                handleUpdateAuthority(
                                                    user.userId,
                                                    user.authority.authorityName
                                                )
                                            }
                                        >
                                            권한업데이트
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-container">
                    <div
                        className="prev-button"
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        이전
                    </div>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            className={`number-button ${
                                currentPage === i + 1 ? "selected" : ""
                            }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <div
                        className="next-button"
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        이후
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                content={modalContent}
            />
        </div>
    );
};

export default UserManagement;
