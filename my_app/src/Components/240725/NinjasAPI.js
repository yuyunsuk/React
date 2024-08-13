import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
    width: 50%;
`;

const Button = styled.button`
    background-color: dodgerblue;
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
    &:hover {
        background-color: blue;
    }
    &:active {
        background-color: darkblue;
    }
`;

const Response = styled.pre``; // 원래 구문 적용

export function NinjasAPI() {
    const API_KEY_NINJA = "4bBbfAyPPgIGqW7h8e9IKA==a9jeibsFriCgDGfE";
    const [api, setAPI] = useState("");
    const [data, setData] = useState("");

    async function sendAPI() {
        try {
            const response = await axios.get(api, {
                headers: {
                    "X-Api-Key": API_KEY_NINJA,
                },
            });
            console.log(response.data);

            setData(JSON.stringify(response.data, null, 2)); // value, replacer, space
        } catch (error) {
            console.log("요청이 실패하였습니다", error);
        }
    }

    return (
        <>
            <Input
                placeholder="API를 입력해 주세요"
                onChange={(e) => setAPI(e.target.value)}
                value={api}
            />
            <Button onClick={sendAPI}>Send API</Button>
            <Response>{data}</Response>
        </>
    );
}
