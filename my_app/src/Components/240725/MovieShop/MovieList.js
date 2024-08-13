import { useState, useEffect, useContext } from "react";
import {
    getGenre,
    getMoviesNowPlaying,
    getMoviesPopular,
    getMoviesTopRated,
    getMoviesUpcoming,
    setGenreListOfMovie,
    IMG_PATH,
} from "./api";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MovieContext, MovieWrapper } from "./MovieWrapper";

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
`;

const Card = styled.div`
    width: 100%;
    border: 1px solid dodgerblue;
    cursor: pointer;
`;

const Img = styled.img`
    width: 100%;
`;

const Text = styled.div``;

const Tab = styled.div`
    display: flex;
    margin: 10px 0;
`;

const Button = styled.button`
    width: 150px;
    height: 40px;
    //background-color: dodgerblue;
    background-color: ${(props) =>
        props.className === "selected" ? "green" : "dodgerblue"};
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
    // 마위스 위에
    &:hover {
        background-color: blue;
    }
    // 마우스 클릭시
    &:active {
        background-color: darkblue;
    }
    // 클래스 active 이면 this.active
    &.active {
        background-color: green;
    }
`;

export function MovieList() {
    const [data, setData] = useState(null);
    // const [category, setCategory] = useState(0); => 부모, 즉 MovieWrapper 로 이동시킴

    const { category, setCategory } = useContext(MovieContext); // 부모, 즉 MovieWrapper 에서 생성한 MovieContext 에서 꺼내서 사용

    // useNavigage 후크는 url 주소를 매개변수로 갖는 페이지 변경 함수를 리턴함!
    const navigate = useNavigate();

    useEffect(() => {
        setGenreListOfMovie();
        getMovies(category);
    }, []);

    // useEffect(() => {
    //     getMovies("N");
    //     setSelectedButton("N");
    // }, []);

    async function getMovies(index) {
        try {
            setCategory(index);
            const response = await categories[index].func();
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.log("Error", error);
        }
    }

    // async function getMovies(type) {
    //     try {
    //         let response;
    //         switch (type) {
    //             case "N":
    //                 response = await getMoviesNowPlaying();
    //                 break;
    //             case "P":
    //                 response = await getMoviesPopular();
    //                 break;
    //             case "T":
    //                 response = await getMoviesTopRated();
    //                 break;
    //             case "U":
    //                 response = await getMoviesUpcoming();
    //                 break;
    //             default:
    //                 response = await getMoviesNowPlaying();
    //                 break;
    //         }

    //         console.log(response.data);

    //         setData(response.data);
    //     } catch (error) {
    //         console.log("Error", error);
    //     }
    // }

    const categories = [
        { category: "Now Playing", func: getMoviesNowPlaying },
        { category: "Popular", func: getMoviesPopular },
        { category: "Top Rated", func: getMoviesTopRated },
        { category: "Upcoming", func: getMoviesUpcoming },
    ];

    return (
        <>
            <h1>Movie List</h1>
            <Tab>
                {
                    // {} 는 return 들어가야 되고, 아니면 ()
                    categories.map((c, i) => (
                        <Button
                            key={i}
                            onClick={() => getMovies(i)}
                            className={i == category ? "active" : ""}
                        >
                            {c.category}
                        </Button>
                    ))
                }
            </Tab>
            <Container>
                {data &&
                    data.results.map((movie) => (
                        <Card
                            key={movie.id}
                            onClick={() => {
                                navigate(`${movie.id}`);
                            }}
                        >
                            <Img src={IMG_PATH + movie.poster_path}></Img>
                            <Text>타이틀 : {movie.title}</Text>
                            <Text>장르 : {getGenre(movie.genre_ids)}</Text>
                            <Text>소개글 : {movie.overview}</Text>
                        </Card>
                    ))}
            </Container>
        </>
    );
}
