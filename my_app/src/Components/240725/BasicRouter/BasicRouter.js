import styled from "styled-components";
import { useState } from "react";

import { Home } from "./Home";
import { About } from "./About";
import { Contact } from "./Contact";

const Container = styled.div``;

const Menu = styled.div`
    display: flex;
`;

const Body = styled.div``;

export function BasicRouter() {
    // Router 란 중계기

    const [view, setView] = useState("home");
    function renderView() {
        switch (view) {
            case "home":
                return <Home />;
            case "about":
                return <About />;
            case "contact":
                return <Contact />;
            default:
                return <Home />;
        }
    }

    return (
        <>
            <Container>
                <Menu>
                    <button onClick={() => setView("home")}>HOME</button>
                    <button onClick={() => setView("about")}>ABOUT</button>
                    <button onClick={() => setView("contact")}>CONTACT</button>
                </Menu>
                <Body>{renderView()}</Body>
            </Container>
        </>
    );
}
