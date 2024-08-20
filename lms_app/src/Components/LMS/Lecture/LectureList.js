import { useState, useEffect, useContext } from "react";
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
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LMSContext, LMSWrapper } from "../LMSWrapper";
import { getCategory } from "../../../Api/CategoryApi/CategoryApi";
import {
  getAllLecture,
  getCategoryLecture,
} from "../../../Api/LectureApi/LectureApi";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
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

export function LectureList() {
  const [data, setData] = useState(null);
  const [LectureData, setLectureData] = useState([]);
  // const [category, setCategory] = useState(0); => 부모, 즉 LMSWrapper 로 이동시킴
  const [keyword, setKeyword] = useState("");

  const { category, setCategory } = useContext(LMSContext); // 부모, 즉 LMSWrapper 에서 생성한 LMSContext 에서 꺼내서 사용

  // useNavigage 후크는 url 주소를 매개변수로 갖는 페이지 변경 함수를 리턴함!
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const LectureData = await getAllLecture();
      setLectureData(LectureData);
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    if (keyword) {
      categoryList(keyword);
    }
  }, [keyword]);

  async function categoryList(keyword) {
    const categoryList = await getCategoryLecture(keyword);
    setLectureData(categoryList);
  }

  return (
    <>
      <h1>강의 리스트</h1>
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
      <Container>
        {LectureData &&
          LectureData.map((Lecture) => (
            <LectureContainer
              key={Lecture.lectureId}
              onClick={() => {
                navigate(`/lectures/${Lecture.lectureId}`);
              }}
            >
              <LectureImg src={Lecture.imagePath}></LectureImg>
              {/* <Text className="content">{Lecture.lectureName}</Text>
              <Text className="content">
                장르 : {Lecture.category.categoryName}
              </Text> */}
              <Content className="lectureContent">
                <h2 style={{ marginBottom: "20px" }}>{Lecture.lectureName}</h2>
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
    </>
  );
}
