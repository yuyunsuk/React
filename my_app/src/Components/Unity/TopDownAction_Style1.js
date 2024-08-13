import { Unity, useUnityContext } from "react-unity-webgl";
import { useState, useEffect } from "react";
import styled from "styled-components";

// 게임을 로드할 화면을 만듬
const Container = styled.div`
    width: 1920px;
    height: 800px;
    margin: auto;
    display: flex;
    flex-direction: row;
`;

// 게임을 로드할 화면을 만듬
const UnityBox = styled.div`
    width: 600px;
    height: 350px;
    margin-left: 40px;
    margin-right: 10px;
    margin-bottom: 350px;
    border: 1px solid gray;
`;

// 게임을 로드할 화면을 만듬
const WebBox = styled.div`
    width: 1200px;
    height: 800px;
    margin-left: 10px;
    border: 1px solid gray;
`;

export function TopDownAction() {
    // const { unityProvider } = useUnityContext({
    //     loaderUrl: "build/myunityapp.loader.js",
    //     dataUrl: "build/myunityapp.data",
    //     frameworkUrl: "build/myunityapp.framework.js",
    //     codeUrl: "build/myunityapp.wasm",
    // });

    const [playingGame, setPlayingGame] = useState(false);

    const [isGameOver, setIsGameOver] = useState(false);
    const [userName, setUserName] = useState();
    const [score, setScore] = useState();

    // React 에서 Unity 로 sendMessage 를 통해 전달하기
    const {
        unityProvider,
        sendMessage,
        addEventListener,
        removeEventListener,
    } = useUnityContext({
        loaderUrl: "build/Build.loader.js",
        dataUrl: "build/Build.data",
        frameworkUrl: "build/Build.framework.js",
        codeUrl: "build/Build.wasm",
    });

    function handleGameOver(userName, score) {
        setIsGameOver(true);
        setUserName(userName);
        setScore(score);
    }

    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, []);

    return (
        <>
            <h1>Top Down Action Game</h1>
            <button
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    margin: "0px 10px 10px 40px",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                }}
                onClick={() => setPlayingGame(true)}
            >
                Start Game
            </button>
            <button
                style={{
                    backgroundColor: "blue",
                    color: "white",
                    margin: "0px 0px 10px 0px",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                }}
                onClick={() => sendMessage("Player", "Attack")}
            >
                Attack
            </button>
            <Container>
                <UnityBox>
                    {playingGame ? (
                        <Unity
                            unityProvider={unityProvider}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    ) : null}
                </UnityBox>
                <WebBox></WebBox>
            </Container>

            {/* // Unity 에서 게임오버 메시지를 받으면 출력후 종료 */}
            {isGameOver === true && (
                <p>{`Game Over ${userName}! You've scored ${score} points.`}</p>
            )}
        </>
    );
}
