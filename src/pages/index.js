import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { syllable } from "syllable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const inter = Inter({ subsets: ["latin"] });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexWrap: "wrap",
  width: 400,
  height: 500,
  alignItems: "center",
  bgcolor: "#73D48C",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
};

const infoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",

  width: 400,
  height: 500,
  bgcolor: "#73D48C",
  flexDirection: "column",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
};

export default function Home({ posts }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [lineOne, setLineOne] = useState("");
  const [lineTwo, setLineTwo] = useState("");
  const [lineThree, setLineThree] = useState("");
  const [author, setAuthor] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const handleInfoOpen = () => setInfoOpen(true);
  const handleInfoClose = () => setInfoOpen(false);

  console.log(posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);
    const res = await axios.post("/api/posts", {
      title,
      lineOne,
      lineTwo,
      lineThree,
      author,
    });
    setLineOne("");
    setLineTwo("");
    setLineThree("");
    setTitle("");
    setAuthor("");
    router.replace(router.asPath);
  };

  return (
    <div className="bg-emerald h-full">
      <Head>
        <title>Hi, You!</title>
        <meta name="description" content="A haiku-based social media site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-14 flex flex-col align-center items-center justify-center  h-12">
        <h1 className="font-seriff text-richBlack text-5xl font-bold">
          Hi, You!
        </h1>
        <p className="font-seriff text-richBlack text-2xl text-middle">
          (A haiku-based social media site)
        </p>

        <hr className="w-full text-cream"></hr>
      </header>

      <Modal
        className="flex"
        open={infoOpen}
        onClose={handleInfoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={infoOpen}>
          <Box sx={infoStyle}>
            <h2
              id="modal-modal-title"
              className="font-seriff font-bold text-richBlack text-2xl pb-1"
            >
              How to Write a Haiku!
            </h2>
            <p
              id="modal-modal-description"
              className="font-seriff text-richBlack pb-2"
            >
              As you probably know, a haiku is a Japanese poem that has three
              lines. The first line has five syllables, the second line has
              seven syllables, and the third line has five syllables. There are
              a actually few more guidelines to follow...
            </p>

            <h3
              id="modal-modal-title"
              className="font-seriff font-bold text-richBlack text-1xl pt-2"
            >
              What is a kigo?
            </h3>
            <p
              id="modal-modal-description"
              className="font-seriff pb-2 text-richBlack"
            >
              Haikus are typically written about nature. A kigo is a seasonal
              word that is used in a haiku. For example, if you were writing a
              haiku about the winter, you could use snow as a kigo. You can
              find a list of kigos in a Saijiki like this
              <a
                target="_blank"
                className="underline"
                rel="noreferrer"
                href="https://wkdkigodatabase03.blogspot.com/2010/03/saijiki-list.html"
              >
                one
              </a>
            </p>

            <h3
              id="modal-modal-title"
              className="font-seriff font-bold text-richBlack text-1xl pt-2"
            >
              What is a kireji?
            </h3>
            <p
              id="modal-modal-description"
              className="font-seriff pb-2 text-richBlack"
            >
              A kireji is a cutting word that divides the haiku and breaks up
              the poems flow. This gets the reader to pause and think in
              between the lines.
            </p>

            <h3
              id="modal-modal-title"
              className="font-seriff font-bold text-richBlack text-1xl pt-2"
            >
              Haiku Breakdown
            </h3>
            <p
              id="modal-modal-description"
              className="font-seriff pb-2 text-center text-richBlack"
            >
              An old silent pond <br /> A frog jumps into the pond— <br />{" "}
              Splash! Silence again
            </p>
            <p
              id="modal-modal-description"
              className="font-seriff pb-2  text-richBlack"
            >
              The kigo on this poem is the absense of sound exceot for the
              water. This relates to the season of spring. the kireji is in the
              first line which sets the scene and gives a brief pause
            </p>

            <h3
              id="modal-modal-title"
              className="font-seriff font-bold text-richBlack text-1xl pt-2"
            >
              Resources
            </h3>
            <p
              id="modal-modal-description"
              className="font-seriff pb-2 text-richBlack"
            >
                <a
                target="_blank"
                className="underline"
                rel="noreferrer"
                href="https://wkdkigodatabase03.blogspot.com/2010/03/saijiki-list.html"
              >
                A short info doc about haikus
              </a>  
              <br></br>
              <a
                target="_blank"
                className="underline"
                rel="noreferrer"
                href="https://wkdkigodatabase03.blogspot.com/2010/03/saijiki-list.html"
              >
               The Saijiki list referenced in the text
              </a>
            </p>
          </Box>
        </Fade>
      </Modal>

      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <h2
              id="modal-modal-title"
              className="font-seriff text-richBlack text-2xl pb-2"
            >
              Create a New Haiku
            </h2>
            <p
              id="modal-modal-description"
              className="font-seriff text-richBlack"
            >
              Title
            </p>
            <input
              className="w-72 h-8 p-2 rounded-xl bg-cream text-richBlack"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p id="modal-modal-description" className="text-richBlack  pt-2">
              Line One
            </p>
            <input
              className="w-72 h-8 p-2 rounded-xl bg-cream text-richBlack"
              type="text"
              value={lineOne}
              onChange={(e) => setLineOne(e.target.value)}
            />
            <p id="modal-modal-description" className="text-richBlack  pt-2">
              Line Two
            </p>
            <input
              className="w-72 h-8 p-2 rounded-xl bg-cream text-richBlack"
              type="text"
              value={lineTwo}
              onChange={(e) => setLineTwo(e.target.value)}
            />
            <p id="modal-modal-description" className="text-richBlack  pt-2">
              Line Three
            </p>
            <input
              className="w-72 h-8 p-2 rounded-xl bg-cream text-richBlack"
              type="text"
              value={lineThree}
              onChange={(e) => setLineThree(e.target.value)}
            />
            <p id="modal-modal-description" className="text-richBlack pt-2">
              Author
            </p>
            <input
              className="w-72 h-8 p-2 rounded-xl bg-cream text-richBlack"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            {syllable(lineOne) === 5 || lineOne.length === 0 ? (
              <></>
            ) : (
              <p className="text-sizzlingRed pt-1">
                Line one does not have five syllables!
              </p>
            )}

            {syllable(lineTwo) === 7 || lineTwo.length === 0 ? (
              <></>
            ) : (
              <p className="text-sizzlingRed pt-1">
                Line two does not have seven syllables!
              </p>
            )}
            {syllable(lineThree) === 5 || lineThree.length === 0 ? (
              <></>
            ) : (
              <p className="text-sizzlingRed pt-1">
                Line three does not have five syllables!
              </p>
            )}
            {title.length > 0 &&
            author.length > 0 &&
            syllable(lineOne) === 5 &&
            syllable(lineTwo) === 7 &&
            syllable(lineThree) === 5 ? (
              <Button
                className="text-richBlack bg-cream hover:bg-emerald mt-8 text-xl font"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            ) : (
              <></>
            )}
          </Box>
        </Fade>
      </Modal>

      <main className="flex justify-center bg-emerald h-max ">
        <div className="flex-row content-start justify-center flex-wrap flex">
          {posts.map((post) => (
            <div
              className=" h-max transition-all w-96 flex flex-col justify-center items-center  p-7 rounded-xl bg-cream m-4"
              key={post.id}
            >
              <h2 className="font-seriff text-richBlack text-4xl text-center">
                {post.title}
              </h2>
              <p className="font-seriff text-richBlack text-xl">
                {post.lineOne}
              </p>
              <p className="font-seriff text-richBlack text-xl">
                {post.lineTwo}
              </p>
              <p className="font-seriff text-richBlack text-xl">
                {post.lineThree}
              </p>

              <p className="font-seriff text-richBlack text-xl text-right">
                —{post.author}
              </p>
            </div>
          ))}
       
        
          <AddCircleIcon
            fontSize="large"
            className="  text-richBlack fixed bottom-10 right-0   sm:bottom-14 sm:right-5	transition-all hover:scale-90"
            onClick={handleOpen}
          />
          <HelpIcon
           fontSize="large"
            className=" text-richBlack fixed bottom-2 right-0  sm:bottom-6 sm:right-5	transition-all hover:scale-90"
            onClick={handleInfoOpen}
          />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
