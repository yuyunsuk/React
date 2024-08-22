import React, { useState, useEffect } from "react";
import {
  getAllQuestions,
  searchQuestions,
  getQuestionById, // 게시글 상세보기 위한 API 추가
} from "../../../Api/CommunityApi/CommunityApi";  // CommunityApi에서 필요한 함수들을 가져옴

export function QA() {
  const [questions, setQuestions] = useState([]); // 질문 데이터를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
  const [category, setCategory] = useState("all"); // 선택된 카테고리
  const [keyword, setKeyword] = useState(""); // 검색 키워드
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택한 질문 (상세보기)
  const pageSize = 5; // 한 페이지에 표시할 항목 수

  // 서버로부터 질문 데이터를 가져오는 함수
  const fetchQuestions = async (page = 1, selectedCategory = "all") => {
    try {
      const data = await getAllQuestions(page - 1, pageSize, selectedCategory !== "all" ? selectedCategory : null);
      setQuestions(data.content); // 질문 데이터
      setTotalPages(data.totalPages); // 전체 페이지 수
      setCurrentPage(page); // 현재 페이지
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // 검색을 수행하는 함수
  const handleSearch = async () => {
    try {
      if (keyword.trim()) {
        const data = await searchQuestions(keyword, currentPage - 1, pageSize);
        setQuestions(data.content); // 검색된 질문 데이터
        setTotalPages(data.totalPages); // 전체 페이지 수
      } else {
        fetchQuestions(currentPage, category); // 검색어가 없으면 전체 목록을 다시 불러옴
      }
    } catch (error) {
      console.error("Error searching questions:", error);
    }
  };

  // 선택한 질문의 상세 정보를 로드하는 함수
  const loadQuestionDetails = async (questionId) => {
    try {
      const question = await getQuestionById(questionId);
      setSelectedQuestion(question); // 선택한 질문 상태 설정
    } catch (error) {
      console.error("Error loading question details:", error);
    }
  };

  // 목록으로 돌아가기 함수
  const goBackToList = () => {
    setSelectedQuestion(null); // 선택된 질문을 해제하여 목록으로 돌아감
  };

  // 페이지네이션 처리 함수
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchQuestions(newPage, category);
    }
  };

  // 카테고리 선택 처리 함수
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // 페이지를 처음으로 돌림
    fetchQuestions(1, newCategory); // 선택된 카테고리로 질문 목록을 다시 불러옴
  };

  // 컴포넌트가 처음 렌더링될 때 질문 목록을 불러옴
  useEffect(() => {
    fetchQuestions(currentPage, category);
  }, []);

  return (
    <div>
      <h1>질의응답</h1>

      {/* 선택한 질문이 없을 때만 질문 목록 및 검색 표시 */}
      {!selectedQuestion && (
        <>
          {/* 카테고리 버튼 */}
          <div>
            <button onClick={() => handleCategoryChange("all")}>전체</button>
            <button onClick={() => handleCategoryChange("수강문의")}>수강문의</button>
            <button onClick={() => handleCategoryChange("회원정보")}>회원정보</button>
            <button onClick={() => handleCategoryChange("시스템")}>시스템</button>
            <button onClick={() => handleCategoryChange("기타")}>기타</button>
          </div>

          {/* 검색 창 */}
          <div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>
          </div>

          {/* 질문 목록 테이블 */}
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.lmsQaSeq}>
                  <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                  <td>{question.categoryId}</td>
                  <td
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => loadQuestionDetails(question.lmsQaSeq)} // 질문 제목 클릭 시 상세 보기 로드
                  >
                    {question.lmsQaTitle}
                  </td>
                  <td>{question.user?.userName || "알 수 없음"}</td>
                  <td>{question.lmsQaWritingDate}</td>
                  <td>{question.lmsQaAnswerCheck === "Y" ? "완료" : "대기"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </>
      )}

      {/* 선택한 질문이 있으면 상세 보기 표시 */}
      {selectedQuestion && (
        <div>
          <h2>질문 상세보기</h2>
          <h3>{selectedQuestion.lmsQaTitle}</h3>
          <p><strong>작성자:</strong> {selectedQuestion.user?.userName || "알 수 없음"}</p>
          <p><strong>작성일:</strong> {selectedQuestion.lmsQaWritingDate}</p>
          <p><strong>내용:</strong> {selectedQuestion.lmsQaContent}</p>
          <p><strong>답변 상태:</strong> {selectedQuestion.lmsQaAnswerCheck === "Y" ? "완료" : "대기"}</p>

          {selectedQuestion.lmsQaAnswerContent && (
            <>
              <h4>답변 내용</h4>
              <p>{selectedQuestion.lmsQaAnswerContent}</p>
            </>
          )}

          {/* 목록으로 돌아가기 버튼 */}
          <button onClick={goBackToList}>목록으로 돌아가기</button>
        </div>
      )}
    </div>
  );
}