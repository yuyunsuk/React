import { useState } from "react";
import styled from "styled-components";

export const sculptureList = [
  {
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description:
      "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips.",
  },
  {
    name: "Floralis Genérica",
    artist: "Eduardo Catalano",
    description:
      "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
    url: "https://i.imgur.com/ZF6s192m.jpg",
    alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.",
  },
  {
    name: "Eternal Presence",
    artist: "John Woodrow Wilson",
    description:
      'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: "https://i.imgur.com/aTtVpES.jpg",
    alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.",
  },
  {
    name: "Moai",
    artist: "Unknown Artist",
    description:
      "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
    url: "https://i.imgur.com/RCwLEoQm.jpg",
    alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces.",
  },
  {
    name: "Blue Nana",
    artist: "Niki de Saint Phalle",
    description:
      "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
    url: "https://i.imgur.com/Sd1AgUOm.jpg",
    alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.",
  },
  {
    name: "Ultimate Form",
    artist: "Barbara Hepworth",
    description:
      "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
    url: "https://i.imgur.com/2heNQDcm.jpg",
    alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure.",
  },
  {
    name: "Cavaliere",
    artist: "Lamidi Olonade Fakeye",
    description:
      "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
    url: "https://i.imgur.com/wIdGuZwm.png",
    alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.",
  },
  {
    name: "Big Bellies",
    artist: "Alina Szapocznikow",
    description:
      "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
    url: "https://i.imgur.com/AlHTAdDm.jpg",
    alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.",
  },
  {
    name: "Terracotta Army",
    artist: "Unknown Artist",
    description:
      "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
    url: "https://i.imgur.com/HMFmH6m.jpg",
    alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.",
  },
  {
    name: "Lunar Landscape",
    artist: "Louise Nevelson",
    description:
      "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
    url: "https://i.imgur.com/rN7hY6om.jpg",
    alt: "A black matte sculpture where the individual elements are initially indistinguishable.",
  },
  {
    name: "Aureole",
    artist: "Ranjani Shettar",
    description:
      'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
    url: "https://i.imgur.com/okTpbHhm.jpg",
    alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.",
  },
  {
    name: "Hippos",
    artist: "Taipei Zoo",
    description:
      "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
    url: "https://i.imgur.com/6o5Vuyu.jpg",
    alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.",
  },
];

const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #eee;
  color: grey;
`;
const Title = styled.div`
  color: dodgerblue;
`;
const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 30px;
`;
const Img = styled.div`
  width: 100%;
  text-align: center;
  img {
    width: 100%;
  }
`;
const Right = styled.div`
  padding: 0 10px;
`;
const Content = styled.p`
  margin: 10px 0;
`;

export function Gallery() {

    // 호출될때 page 가 업데이트 됨
    const [page, setPage] = useState(0);

    // 호출될때 showDescription 가 업데이트 됨 (true: 보임, false: 안보임)
    const [showDescription, setShowDescription] = useState(false);

    function prev() {
        // count = count - 1;
        if (page > 0) {
            setPage(page - 1) // 업데이트할 값을 전달, 직접적으로 계산하거나 할당해서는 안됨 
            console.log("minus page: " + page);
        } else {
            console.log("처음 Page 입니다.");
        }
    }

    function next() {
        // count = count + 1;
        if (page < sculptureList.length - 1) {
            setPage(page + 1) // 업데이트할 값을 전달, 직접적으로 계산하거나 할당해서는 안됨
            console.log("plus page: " + page);
        } else {
            console.log("마지막 Page 입니다.");
        }
    }

    function toggleDescription() {
        setShowDescription(!showDescription);
    }

    /* <Container>
        <h2>
          <Title>{sculptureList[0].name}</Title>
          by {sculptureList[0].artist}
        </h2>
        <h4>
          {0} of {sculptureList.length}
          <button style={{ marginLeft: "20px" }}>Prev</button>
          <button style={{ marginLeft: "20px" }}>Next</button>
        </h4>
        <Box>
          <Img>
            <img src={sculptureList[0].url} alt={sculptureList[0].alt} />
          </Img>
          <Right>
            <button>Detail</button>
            <Content>{sculptureList[0].description}</Content>
          </Right>
        </Box>
    </Container> */

    return (
        <>
          <Container>
            <h2>
              <Title>{sculptureList[page].name}</Title>
              by {sculptureList[page].artist}
            </h2>
            <h4>
              {page + 1} of {sculptureList.length}
              <button style={{ marginLeft: "20px" }} onClick={prev}>Prev</button>
              <button style={{ marginLeft: "20px" }} onClick={next}>Next</button>
            </h4>
            <Box>
              <Img>
                <img src={sculptureList[page].url} alt={sculptureList[page].alt} />
              </Img>
              <Right>
                <button onClick={toggleDescription}>Detail</button>
                {showDescription && (
                    <Content>{sculptureList[page].description}</Content>
                )}
              </Right>
            </Box>
          </Container>
        </>
    );
}
