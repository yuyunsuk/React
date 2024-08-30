import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";

import { LectureDetail } from "./LectureDetail";

import React, { useState, useEffect } from "react";
import {
    getGenre,
    getAllLectures,
    getRecommendedLectures,
    getFreeLectures,
    getPaidLectures,
    getNewLectures,
    setGenreListOfMovie,
    IMG_PATH,
} from "../api";
import { LMSContext, LMSWrapper } from "../LMSWrapper";
import { getCategory } from "../../../Api/CategoryApi/CategoryApi";
import {
    getAllLecture,
    getCategoryLecture,
} from "../../../Api/LectureApi/LectureApi";

import styled from "styled-components";

import "../../../Styles/noMenu.css";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
`;

const SearchBox = styled.div`
    margin: 0 auto;
`;

const Input = styled.input`
    width: 500px;
    margin-right: 5px;
`;

const LectureContainer = styled.div`
    aspect-ratio: 1 / 0.7;
    border-radius: 8px;
    position: relative;
    background-color: #000000;
    overflow: hidden;
    box-shadow: 0 0 20px #eee;
    cursor: pointer;

    &:hover img {
        filter: grayscale(1) brightness(0.4);
    }

    &:hover::after {
        opacity: 1;
        inset: 20px;
    }

    &:hover .lectureContent {
        opacity: 1;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid white;
        border-radius: inherit;
        opacity: 0;
        transition: 0.4s ease-in-out;
    }
`;

const LectureImg = styled.img`
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: 0.5s ease-in-out;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    opacity: 0;
    transition: 0.5s ease-in-out;
    width: 75%;
`;

const Tab = styled.div`
    display: flex;
    margin: 10px 0;
`;

const Button = styled.button`
    width: 150px;
    height: 40px;
    //background-color: dodgerblue;
    background-color: ${(props) =>
        props.className === "selected" ? "green" : "dodgerblue"};
    border: none;
    color: white;
    padding: 5px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.1rem;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    // 마위스 위에
    &:hover {
        background-color: blue;
    }
    // 마우스 클릭시
    &:active {
        background-color: darkblue;
    }
    // 클래스 active 이면 this.active
    &.active {
        background-color: green;
    }
`;

// Sub Modal

// React Modal의 루트 엘리먼트를 설정합니다
Modal.setAppElement("#root");

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        width: "1300px", // 모달의 너비를 설정합니다. (기존 width)
        height: "800px", // 모달의 높이를 설정합니다. (기존 height)
        padding: "20px",
        borderRadius: "10px",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 오버레이의 배경색을 설정합니다.
    },
};

export function LectureListModal() {
    // Hooks 호출: 항상 최상위에서 호출되어야 합니다
    // const [data, setData] = useState(null);
    const [LectureData, setLectureData] = useState([]);
    // const [category, setCategory] = useState(0); => 부모, 즉 LMSWrapper 로 이동시킴
    const [keyword, setKeyword] = useState("");

    // const { category, setCategory, toggleModal } = useContext(LMSContext); // 부모, 즉 LMSWrapper 에서 생성한 LMSContext 에서 꺼내서 사용
    const [inputValue, setInputValue] = useState("");

    /* Sub Modal 관련 */
    const [modalOpen, setModalOpen] = useState(false);
    const [modalReturn, setModalReturn] = useState(null);
    const [modalContent, setModalContent] = useState(null);

    // useNavigage 후크는 url 주소를 매개변수로 갖는 페이지 변경 함수를 리턴함!
    // const navigate = useNavigate();

    useEffect(() => {
        lectureList();
    }, [inputValue]);

    useEffect(() => {
        if (keyword) {
            categoryList(keyword);
        }
    }, [keyword]);

    // 강의 데이터 & 검색
    async function lectureList() {
        if (!inputValue) {
            const lectureAxios = await getAllLecture();
            setLectureData(lectureAxios);
        } else {
            const lectureSearch = await getAllLecture(inputValue);
            setLectureData(lectureSearch);
        }
    }

    // 카테고리 검색
    const categories = [
        { category: "전체" },
        { category: "추천" },
        { category: "무료" },
        { category: "유료" },
        { category: "신규" },
    ];

    async function getCategory(selectedCategory) {
        try {
            switch (selectedCategory) {
                case "전체":
                case "추천":
                case "무료":
                case "유료":
                case "신규":
                    setKeyword(selectedCategory);
                    break;
                default:
                    setKeyword("전체");
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    async function categoryList(keyword) {
        const categoryList = await getCategoryLecture(keyword);
        setLectureData(categoryList);
    }

    /* Sub Modal 관련 */
    const openModal = (lectureId) => {
        setModalContent(`/lectures/${lectureId}`);
        // setModalReturn(() => `LectureDetail ${lectureId}`); // => 새로운 브라우저 창 열기
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent(null);
    };

    return (
        <>
            <Tab>
                {
                    // {} 는 return 들어가야 되고, 아니면 ()
                    categories.map((c) => (
                        <Button onClick={() => getCategory(c.category)}>
                            {c.category}
                        </Button>
                    ))
                }
            </Tab>
            <SearchBox>
                <Input
                    placeholder="검색어를 입력해주세요"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={() => lectureList(inputValue)}>Search</button>
            </SearchBox>
            <Container>
                {LectureData &&
                    LectureData.map((Lecture) => (
                        <LectureContainer
                            key={Lecture.lectureId}
                            onClick={() => {
                                // window.alert("Lecture.lectureId: " + Lecture.lectureId);
                                openModal(Lecture.lectureId);
                            }} // Modal Open

                            // onClick={() => {
                            //     // navigate(`/lectures/${Lecture.lectureId}`);
                            //     // window.open(
                            //     //     `http://localhost:3000/lectures/${Lecture.lectureId}`,
                            //     //     "_blank"
                            //     // );

                            //     modalReturn = `/lectures/${Lecture.lectureId}`;
                            // }}
                        >
                            <LectureImg src={Lecture.imagePath}></LectureImg>
                            {/* <Text className="content">{Lecture.lectureName}</Text>
              <Text className="content">
                장르 : {Lecture.category.categoryName}
              </Text> */}
                            <Content className="lectureContent">
                                <h2 style={{ marginBottom: "20px" }}>
                                    {Lecture.lectureName}
                                </h2>
                                <p style={{ marginTop: "40px" }}>
                                    {Lecture.category.categoryName}
                                </p>
                            </Content>
                            {/* <Text className="content">
                소개글 : {Lecture.educationOverview}
              </Text> */}
                        </LectureContainer>
                    ))}
            </Container>

            {/* 서브 모달 */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Lecture Details"
            >
                <span
                    className="close"
                    onClick={closeModal}
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5rem",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                    }}
                >
                    &times;
                </span>
                <div
                    className="subModalContent"
                    style={{
                        width: "1240px",
                        height: "740px",
                        overflow: "hidden",
                    }}
                >
                    {/* 모달 콘텐츠를 동적으로 렌더링할 수 있습니다 */}
                    {modalContent ? (
                        <iframe
                            src={modalContent}
                            style={{ width: "100%", height: "100%" }}
                            title="Lecture Details"
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </Modal>
        </>
    );
}
