import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const Input = styled.input`
    width: 400px;
`;

const Response = styled.div``;

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

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Card = styled.div`
    width: 500px;
    height: 300px;
    // 웹페이지 색은 단색 보다는 gradient 가 좋음
    // background: linear-gradient(90deg, lightblue, dodgerblue);
    background: ${(props) =>
        props.$temp >= 20
            ? "linear-gradient(90deg, #ff7e5f, #feb47b)"
            : "linear-gradient(90deg, #00c6ff, #0072ff)"};
    color: white;
    border-radius: 10px; // 모서리 라운드
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 30px;
`;

const SearchBox = styled.div`
    width: 500px;
    height: 30px;
    display: grid;
    grid-template-columns: 7fr 2fr;
    margin: 20px;
`;

const Icon = styled.div`
    text-align: center;
    img {
        width: 100%;
        margin-top: 20px;
    }
`;

const Weather = styled.div`
    display: flex;
    flex-direction: column;
    text-align: end; // 오른쪽 정렬
`;

const Temp = styled.div`
    margin-top: 20px;
    font-size: 5rem;
    i {
        font-size: 3.5rem;
    }
`;

const City = styled.div`
    font-size: 2.5rem;
`;

const Info = styled.div`
    font-size: 1.5rem;
    margin-top: 30px;
`;

export function OpenWeather() {
    const API_KEY = "b5c0480ce07be15b9bd84a3754bee904";
    const [newCityName, setNewCityName] = useState(""); // 초기값 서울

    const [icon, setIcon] = useState("");
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");

    // // useEffect 를 사용 빈 배열 처리를 해야 처음 한번만 처리됨
    // useEffect(() => {
    //     setIcon("@4d");
    //     setTemp(28);
    //     setCity("Daejeon");
    //     setWeather("Clouds");
    // }, []);

    useEffect(() => {
        sendAPI();
    }, []); // 최초 1회만

    // Async ~ await 방식의 비동기 코드는 반드시 함수안에서 실행되어야 하고
    // 함수선언문 앞에 async 키워드가 필요함.
    // async function geoOK(position) {
    async function sendAPI() {
        // const lat = position.coords.latitude;
        // const lon = position.coords.longitude;
        // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        //const cityName = "seoul";
        const urlCity = `https://api.openweathermap.org/data/2.5/find?q=${newCityName}&appid=${API_KEY}&units=metric`;

        // 1. Axios 사용법(Async ~ await) => 콜백을 사용하지 않음, 일반 함수처럼 사용, 들어 있는 함수 앞에 async 를 붙여야 함, 일반적으로 try catch 구분 사용
        // geoOK 만 멈춰 있음, thread 를 따로 만듬.
        // 여러개의 API 를 사용하는 경우 바로 밑에 await axios 를 사용하면 처리됨
        try {
            //const response = await axios.get(url);
            const response = await axios.get(urlCity);
            const data = response.data;

            console.log("OpenWeatherMap Response: " + data);

            setCity(data.list[0].name);
            setTemp(parseInt(data.list[0].main.temp));
            setIcon(data.list[0].weather[0].icon);
            setWeather(data.list[0].weather[0].main);
        } catch (error) {
            console.log("요청이 실패했습니다.", error);
        }

        // 2. Axios 사용법(Promise ~ then), .then (콜백)
        // axios
        //     .get(url)
        //     .then((response) => {
        //         const data = response.data;

        //         console.log(data);
        //         setCity(data.name);
        //         setTemp(parseInt(data.main.temp));
        //         setIcon(data.weather[0].icon);
        //         setWeather(data.weather[0].main);
        //     })
        //     .catch((error) => {
        //         console.log("요청이 실패했습니다.", error);
        //     });

        // 오래된 버전에서는 지원 안할수 있음
        // 3. fetch 사용법
        // fetch(url)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((data) => {
        //         console.log(data);
        //         setCity(data.name);
        //         setTemp(parseInt(data.main.temp));
        //         setIcon(data.weather[0].icon);
        //         setWeather(data.weather[0].main);
        //     })
        //     .catch((error) => {
        //         console.log("요청이 실패했습니다.", error);
        //     });
    }

    // function geoError() {
    //     alert("현재 위치정보를 찾을 수 없습니다.");
    // }

    return (
        <>
            <Container>
                {/* 왼쪽 아이콘, 오른쪽 위 온도, 아래 도시 */}
                <Card temp={temp}>
                    <Icon>
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        />
                    </Icon>
                    <Weather>
                        <Temp>
                            {temp}
                            <i className="ti ti-temperature-celsius"></i>
                        </Temp>
                        <City>{city}</City>
                        <Info>{weather}</Info>
                    </Weather>
                </Card>
                <SearchBox>
                    <Input
                        placeholder="도시 이름을 영어로 입력해 주세요"
                        onChange={(e) => setNewCityName(e.target.value)}
                        value={newCityName}
                    />
                    <Button onClick={sendAPI}>Search</Button>
                    <Response>{newCityName}</Response>
                </SearchBox>
            </Container>
        </>
    );
}
