import styled from "styled-components";
import { useState } from "react";

import { Home } from "./Home";
import { About } from "./About";
import { Contact } from "./Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div``;

const Menu = styled.div`
    display: flex;
`;

const Body = styled.div``;

export function ReactRouter() {
    console.log("랜더링");

    return (
        <>
            <BrowserRouter>
                <Container>
                    <Menu>
                        {/* 1. 주소창 바뀜(주소창 Base), a Tag 특징 => 화면에 Reload 를 기본으로 탑재함, Reload 하기 때문에 useState 를 사용할 수 없음, 다른 Tag 사용해야 함 */}
                        {/* a태그는 화면 새로고침을 강제하기 때문에 리액트 구조에 맞지 않음, 모든 상태 초기화됨 */}
                        {/* <a href="/home">Home</a>
                        <a href="/about">About</a>
                        <a href="/contact">Contact</a> */}
                        <Link to="/home">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </Menu>
                    <Body>
                        <Routes>
                            {/* // 2. 리엑트 라우터 돔이 리스트에서 찾아서 콤포넌트를 넣음 */}
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/home" element={<Home />}></Route>
                            <Route path="/about" element={<About />}></Route>
                            <Route
                                path="/contact"
                                element={<Contact />}
                            ></Route>
                        </Routes>
                    </Body>
                </Container>
            </BrowserRouter>
        </>
    );
}
