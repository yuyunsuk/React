import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Dashboard } from "./Dashboard";
import { Login } from "./Login";
import { Error } from "./Error";
import { Movie } from "./Movie";
import { MovieList } from "./MovieList";
import { Search } from "./Search";
import styled from "styled-components";
import { MovieWrapper } from "./MovieWrapper";

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`;
const Section = styled.div`
    width: 60%;
`;
const Menu = styled.div`
    width: 100%;
`;
const ContentBox = styled.div`
    width: 100%;
    margin-top: 30px;
`;

export function MovieShop() {
    return (
        <>
            <BrowserRouter>
                <Container>
                    <Section>
                        <Menu>
                            <Navbar />
                        </Menu>
                        <ContentBox>
                            {/* <Route path="/movie" element={<MovieList />}> // mypage.com/movie => mypage.com/movie/12345 => 자식을 랜더링 해주는 코드 추가 필요 */}
                            {/* 유동적, id 는 변수 <Route paht=":id" element={<Movie />} /> */}
                            {/* 고정적 <Route paht="detail" element={<Movie />} /> */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/movie" element={<MovieWrapper />}>
                                    <Route index element={<MovieList />} />
                                    {/* // pathvariable */}
                                    <Route path=":id" element={<Movie />} />
                                </Route>
                                <Route path="/search" element={<Search />} />
                                <Route
                                    path="/dashboard"
                                    element={<Dashboard />}
                                />
                                <Route path="/login" element={<Login />} />
                                <Route path="*" element={<Error />} />
                            </Routes>
                        </ContentBox>
                    </Section>
                </Container>
            </BrowserRouter>
        </>
    );
}
