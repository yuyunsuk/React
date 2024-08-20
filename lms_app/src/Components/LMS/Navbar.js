import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";
import styled from "styled-components";
// import { useAuth } from "./AuthContext";

const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: dodgerblue;
    position: relative;
    justify-content: center; /* 수평 중앙 정렬 */
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    padding: 5px;
    background-color: dodgerblue;
    &:hover {
        background-color: blue;
    }
    &:active {
        background-color: darkblue;
    }
`;

export function Navbar() {
    // const { isAuthenticated, logout } = useAuth();

    return (
        <>
            <Container>
                {/* <StyledLink to="/">
                    <NavItem icon="ti ti-home" name="홈"></NavItem>
                </StyledLink> */}
                <StyledLink to="/home">
                    <NavItem icon="ti ti-home" name="홈"></NavItem>
                </StyledLink>
                <StyledLink to="/lecture">
                    <NavItem icon="ti ti-device-tv" name="강의"></NavItem>
                </StyledLink>
                <StyledLink to="/search">
                    <NavItem icon="ti ti-search" name="상세조회"></NavItem>
                </StyledLink>
                <StyledLink to="/cart">
                    <NavItem
                        icon="ti ti-shopping-cart"
                        name="장바구니"
                    ></NavItem>
                </StyledLink>
                <StyledLink to="/mypage/user">
                    <NavItem icon="ti ti-user" name="마이페이지"></NavItem>
                </StyledLink>
                <StyledLink to="/community">
                    <NavItem icon="ti ti-friends" name="커뮤니티"></NavItem>
                </StyledLink>

                {/* {isAuthenticated ? (
                    <StyledLink to="/logout">
                        <NavItem icon="ti ti-logout" name="로그아웃" />
                    </StyledLink>
                ) : (
                    <StyledLink to="/login">
                        <NavItem icon="ti ti-login" name="로그인" />
                    </StyledLink>
                )}
                {isAuthenticated && (
                    <StyledLink to="/admin/user">
                        <NavItem icon="ti ti-settings" name="관리자" />
                    </StyledLink>
                )} */}

                <StyledLink to="/login">
                    <NavItem icon="ti ti-login" name="로그인/아웃" />
                </StyledLink>

                <StyledLink to="/admin/user">
                    <NavItem icon="ti ti-settings" name="관리자" />
                </StyledLink>
            </Container>
        </>
    );
}
