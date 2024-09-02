import styled from "styled-components";
import { Navbar } from "../Navbar";
import { LeftSidebar } from "../Sidebar";
import { IndexCommunity } from "../Community/IndexComunity";
import {
  BestLecture,
  IndexLecture,
  IndexLectureImg,
} from "../Lecture/IndexLecture";
import { Footer } from "../Footer";

const Container = styled.div`
  box-sizing: border-box;
  padding: 176px 32px 0 240px;
  transition: all 0.3s;
  min-height: 200vh;
`;

export function Index() {
  return (
    <>
      <Navbar />
      <LeftSidebar />
      <Container>
        <IndexLecture />
        <IndexCommunity />
        <IndexLectureImg />
        <BestLecture />
      </Container>
      <Footer />
    </>
  );
}
