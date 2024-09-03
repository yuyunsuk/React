import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { NavItem } from "./NavItem";
import { BookIcon, GameIcon, UserIcon } from "../../Utils/svg";
// import "https://use.fontawesome.com/releases/v5.6.1/css/all.css";

const LeftSideContainer = styled.div`
    box-sizing: border-box;
    width: 240px;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
`;

const SideManu = styled.div`
    padding: 38px 32px 32px 32px;
    height: 100%;
`;

const SideLogo = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80px;
`;

const Logo = styled.img`
    width: 100%;
`;

const SideItem = styled.div`
    padding: 100px 0 0 0;
`;

const SideContant = styled.div`
    position: relative;
    cursor: pointer;
    color: white;
    display: block;
    padding-bottom: 12px;
`;

const TextStyle = styled.p`
    font-size: 19px;
    font-weight: 700;
    color: #9da2b9;
    padding: 13px 0px 8px 8px;
    border-left: 1px solid #1a1b24;
`;

const Group = styled.div`
    display: flex;
    align-items: center;
    padding: 2px;
`;

const RightSideContainer = styled.div`
    box-sizing: border-box;
    width: 240px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 990;
    background-color: #fff;
`;

export function LeftSidebar() {
    const navigate = useNavigate();

    return (
        <>
            <LeftSideContainer>
                <SideManu>
                    <SideLogo>
                        <Logo src="/image/logo.png"></Logo>
                    </SideLogo>
                    <SideItem>
                        <SideContant onClick={() => navigate("/lecture")}>
                            <Group>
                                <BookIcon></BookIcon>
                                <TextStyle>강의보기</TextStyle>
                            </Group>
                        </SideContant>
                        <SideContant onClick={() => navigate("/community/*")}>
                            <Group>
                                <UserIcon></UserIcon>
                                <TextStyle>커뮤니티</TextStyle>
                            </Group>
                        </SideContant>
                        <SideContant onClick={() => navigate("/admin/*")}>
                            <Group>
                                <UserIcon></UserIcon>
                                <TextStyle>Admin</TextStyle>
                            </Group>
                        </SideContant>
                        <SideContant onClick={() => navigate("/home")}>
                            <Group>
                                <GameIcon></GameIcon>
                                <TextStyle>게임하기</TextStyle>
                            </Group>
                        </SideContant>
                    </SideItem>
                </SideManu>
            </LeftSideContainer>
        </>
    );
}

export function RightSidebar() {
    return (
        <>
            <RightSideContainer></RightSideContainer>;
        </>
    );
}
