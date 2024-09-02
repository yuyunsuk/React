import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLecture } from "../../../Api/LectureApi/LectureApi";
import styled from "styled-components";
import {
  getContentsByLectureId,
  getReviewByLectureId,
} from "../../../Api/LeaningApi/LeaningApi";
import { getTeacherByLectureId } from "../../../Api/TeacherApi/TeacherApi";
import { getCurrentUser } from "../../../Api/UserApi/UserApi";
import { saveCourseRegistration } from "../../../Api/CourseApi/CourseApi";
import { Navbar } from "../Navbar";
import { LeftSidebar } from "../Sidebar";
import { CartLectureIcon } from "../../../Utils/svg";

const LectureHeaderImg = styled.div`
  padding: 176px 50px 0 240px;
  width: 100%;
  height: 500px;
  background-image: url("/image/LectureDetail.png");
  background-size: cover;
  background-position: center;
  border-radius: 15px;
`;

const Container = styled.div`
  box-sizing: border-box;
  padding: 30px 50px 0 240px;
  transition: all 0.3s;
  display: grid;
  grid-template-columns: 70% 30%;
  height: 2000px;
`;

const LectureContainer = styled.div`
  width: 100%;
  padding: 30px;
`;

const LectureImg = styled.img`
  width: 100%;
`;

const LectureSideMenu = styled.div``;

const LectureName = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 1.4;
  color: #ffce48;
  background-color: transparent;
`;

const LectureOption = styled.div`
  background-color: #1c1f27;
  margin-bottom: 20px;
  border-radius: 12px;
  width: 100%;
  padding: 20px;
  position: relative;
`;

const LectureContentText = styled.p`
  font-size: 15px;
  color: #fff;
  background-color: transparent;
  line-height: 2;
`;

const BtnBox = styled.div`
  width: 36px;
  height: 36px;
  background-color: #1c1f27;
  border: 0;
  margin-right: 4px;
  color: #fff;
  border-radius: 4px;
  padding: 5px;
  cursor: pointer;
  position: absolute; /* 절대 위치 설정 */
  bottom: 10px; /* 부모 div의 맨 아래에서 10px 위에 위치 */
  right: 10px; /* 부모 div의 오른쪽에서 10px 왼쪽에 위치 */
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #3a3f49;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LectureAddBtn = styled.button`
  width: 100%;
  height: 60px;
  background-color: #87ceeb;
  font-size: 16px;
  cursor: pointer;
  font-stretch: normal;
  font-style: normal;
  line-height: 63px;
  letter-spacing: normal;
  color: #333;
  border-radius: 12px;
  margin-bottom: 10px;
  font-weight: 700;
`;

export function LectureDetail() {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState({});
  const [content, setContent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [review, setReview] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Axios();
  }, [lectureId]);

  // 로그인한 userId 가져오기
  useEffect(() => {
    async function getUserId() {
      try {
        const SessionData = await getCurrentUser();
        setUserId(SessionData.userId);
      } catch (error) {
        console.log("User Id Error", error);
      }
    }
    getUserId();
  }, []);

  // 수강신청
  async function courseAdd() {
    const courseRegistration = {
      user: {
        userId: userId,
      },
      lecture: {
        lectureId: lectureId,
      },
    };
    const confirm = window.confirm("수강신청 하시겠습니까 ?");
    if (!confirm) {
      return;
    }
    try {
      const courseAxios = await saveCourseRegistration(courseRegistration);
      alert("수강신청 되었습니다");
    } catch (error) {
      console.log("Course Error", error);
    }
  }

  // 장바구니 담기
  async function cartAdd() {
    let userId;
    let cartList;
    if (!cartList) {
      try {
        const SessionData = await getCurrentUser();
        userId = SessionData.userId;
        cartList = JSON.parse(localStorage.getItem(userId));
        if (!cartList) {
          cartList = [];
        }
        const lectureExists = cartList.some(
          (item) => item.lectureId === lecture.lectureId
        );
        if (lectureExists) {
          alert("중복");
        } else {
          alert("장바구니에 담았습니다");
          cartList.push(lecture);
        }

        localStorage.setItem(userId, JSON.stringify(cartList));
      } catch (error) {
        console.log("Session Error", error);
      }
    }
  }

  // 장바구니 삭제
  async function cartRemove() {
    let userId;
    let cartList;

    try {
      const SessionData = await getCurrentUser();
      userId = SessionData.userId;
      cartList = JSON.parse(localStorage.getItem(userId));

      if (cartList) {
        cartList = cartList.filter((item) => item.lectureId !== lectureId);
        localStorage.setItem(userId, JSON.stringify(cartList));
      }
    } catch (error) {
      console.log("Session Error", error);
    }
  }

  async function Axios() {
    // Lecture 데이터
    try {
      const LectureData = await getLecture(lectureId);
      setLecture(LectureData);
    } catch (error) {
      console.log("Lecture Error", error);
    }

    // Content 데이터
    try {
      const ContentData = await getContentsByLectureId(lectureId);
      setContent(ContentData);
    } catch (error) {
      console.log("Content Error", error);
    }

    // Teacher 데이터
    try {
      const TeacherData = await getTeacherByLectureId(lectureId);
      setTeacher(TeacherData);
    } catch (error) {
      console.log("Teacher Error", error);
    }

    // Review 데이터
    try {
      const ReviewData = await getReviewByLectureId(lectureId);
      setReview(ReviewData);
    } catch (error) {
      console.log("Review Error", error);
    }
  }

  async function CourseMove() {
    navigate(`/course/${userId}/${lectureId}`);
  }

  return (
    <>
      <Navbar />
      <LeftSidebar />
      <LectureHeaderImg></LectureHeaderImg>
      <Container>
        <LectureContainer>
          <p>Lecture Description: {lecture.learningObject}</p>
          <p>　</p>
          <p>*Content Data*</p>
          {content.map((data, index) => (
            <p key={index}>
              {index}.{data.learningContents}
            </p>
          ))}
          <p>　</p>
          <p>*Teacher Data*</p>
          {teacher.map((data, index) => (
            <p key={index}>{data.teacherResume}</p>
          ))}
          <p>　</p>
          <p>*Review Data*</p>
          {review && review.length > 0 ? (
            review.map((data, index) => (
              <div key={index}>
                <p>{data.course_registration.user.userNameKor}</p>
                <p>{data.learningReviewTitle}</p>
                <p>{data.learningReviewContent}</p>
              </div>
            ))
          ) : (
            <p>리뷰가 없습니다.</p>
          )}
        </LectureContainer>
        <LectureSideMenu>
          <LectureImg src={lecture.imagePath} alt="Lecture" />

          <LectureOption>
            <LectureName>{lecture.lectureName}</LectureName>
            <LectureContentText>
              가격 :{" "}
              {lecture.educationPrice === 0
                ? "무료"
                : `${lecture.educationPrice}원`}
            </LectureContentText>
            <LectureContentText>
              학습기간 : {lecture.educationPeriodStartDate} ~{" "}
              {lecture.educationPeriodEndDate}
              <LectureContentText>
                교육시간 : {lecture.educationHours}시간
              </LectureContentText>
              <LectureContentText>
                {/* 장르 : {lecture.category.categoryName} */}
              </LectureContentText>
              <BtnBox onClick={cartAdd}>
                <CartLectureIcon />
              </BtnBox>
            </LectureContentText>
            <p style={{ backgroundColor: "transparent" }}>asd</p>
          </LectureOption>
          <LectureAddBtn onClick={courseAdd}>수강하기</LectureAddBtn>

          {/* <p>　</p>
          <p>*CartRemove*</p>
          <button onClick={cartRemove}>삭제</button> */}

          <p>　</p>
          <p>*Course View*</p>
          <button onClick={CourseMove}>강의보기</button>
        </LectureSideMenu>
      </Container>
    </>
  );
}
