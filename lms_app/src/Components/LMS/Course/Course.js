import { useParams } from "react-router-dom";
import { getContentsByLectureId } from "../../../Api/LeaningApi/LeaningApi";
import { useEffect, useState } from "react";
import { getTeacherByLectureId } from "../../../Api/TeacherApi/TeacherApi";
import {
    getLecture,
    getLectureProgressDetails,
} from "../../../Api/LectureApi/LectureApi";
import styled from "styled-components";

import axios from "axios";

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 5px;
    margin-right: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

const PdfLink = styled.a`
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

const Modal = styled.div`
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 70%;
    max-width: 800px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
    background: none;
    border: none;
    color: #000;
    padding: 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
`;

export function Course() {
    const { userId, lectureId } = useParams();
    const [learning, setlearing] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [lecture, setLecture] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoPath, setSelectedVideoPath] = useState("");

    useEffect(() => {
        Axios();
    }, [lectureId]);

    async function Axios() {
        // learning Content 데이터
        try {
            const learningData = await getContentsByLectureId(lectureId);
            setlearing(learningData);
            console.log("2", learningData);
        } catch (error) {
            console.log("leaning Error", error);
        }

        // Teacher 데이터
        try {
            const teacherData = await getTeacherByLectureId(lectureId);
            setTeacher(teacherData);
        } catch (error) {
            console.log("Teacher Error", error);
        }

        // Lecture 데이터
        try {
            const lectureData = await getLecture(lectureId);
            setLecture(lectureData);
        } catch (error) {
            console.log("Lecture Error", error);
        }
    }

    // 강의 path
    const openModal = (videoPath) => {
        setSelectedVideoPath(videoPath);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideoPath("");
    };
    console.log(learning);

    return (
        <>
            <p>　</p>
            <p>*Lecture Data*</p>
            <p>{lecture.lectureId}</p>
            <p>{lecture.lectureName}</p>
            <p>　</p>
            <p>*Teacher Data*</p>
            {teacher.map((data, index) => (
                <p key={index}>{data.teacherResume}</p>
            ))}
            <p>　</p>
            <p>*Progress Data*</p>
            {learning.map((data, index) => (
                <div key={index}>
                    <p>{data.learningContentsSeq}차시</p>
                    <p>{data.learningContents}</p>
                    <Button
                        onClick={() => {
                            // const urlLectureContentQA = `http://localhost:8080/learning/contents/qa/${lectureId}/${data.learningContentsSeq}`; // /{lectureId}/{learningContentsSeq}

                            // window.alert(
                            //     "urlLectureContentQA: " + urlLectureContentQA
                            // );

                            // axios
                            //     .get(urlLectureContentQA, {
                            //         withCredentials: true,
                            //     })
                            //     .then((response) => {
                            //         console.log("데이터:", response.data);
                            //         window.alert(
                            //             "response.data: " +
                            //                 response.data[0].question +
                            //                 "@" +
                            //                 response.data[1].question +
                            //                 "@" +
                            //                 response.data[2].question
                            //         );

                            //         const jsonData = JSON.stringify(response.data);

                            //         // Unity로 데이터 전송
                            //         sendMessage("DataReceiverObject", "ReceiveJsonData", jsonData);

                            //     })
                            //     .catch((error) => {
                            //         console.log("에러 발생: ", error);
                            //     });

                            openModal(data.learning_video_path);
                        }}
                    >
                        동영상 보기
                    </Button>
                    <PdfLink href={data.learningPdf_path} target="_blank">
                        PDF 보기
                    </PdfLink>
                </div>
            ))}

            {isModalOpen && (
                <Modal>
                    <CloseButton onClick={closeModal}>&times;</CloseButton>
                    <ModalContent>
                        <video controls style={{ width: "100%" }}>
                            <source src={selectedVideoPath} type="video/mp4" />
                        </video>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}
