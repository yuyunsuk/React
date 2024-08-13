import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: dodgerblue;
    position: relative;
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
    return (
        <>
            <Container>
                <StyledLink to="/">
                    <NavItem icon="ti ti-home" name="HOME"></NavItem>
                </StyledLink>
                <StyledLink to="/movie">
                    <NavItem icon="ti ti-device-tv" name="MOVIE"></NavItem>
                </StyledLink>
                <StyledLink to="/search">
                    <NavItem icon="ti ti-search" name="SEARCH"></NavItem>
                </StyledLink>
                <StyledLink to="/dashboard">
                    <NavItem icon="ti ti-user" name="MYPAGE"></NavItem>
                </StyledLink>
                <StyledLink to="/login">
                    <NavItem icon="ti ti-login" name="LOGIN"></NavItem>
                </StyledLink>
            </Container>
        </>
    );
}
