import resume from "./assets/resumeBianca.pdf";
import { FaBookReader } from "react-icons/fa";
import { FaDesktop, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import perfil from "./assets/perfil.jpg";
import projects from "./assets/projects.jpg";
function App() {
    return (
        <>
            {/** Navbar */}
            <nav
                id="desktop-navbar"
                className="p-10 flex justify-around items-center font-['Poppins'] max-w-7xl mx-auto"
            >
                <div id="logo">
                    <h1 className="text-2xl font-semibold">Bianca Espindola</h1>
                </div>
                <div>
                    <ul className="flex gap-10 ">
                        <a href="" className="text-xl ">
                            About
                        </a>
                        <a href="" className="text-xl">
                            Experiences
                        </a>
                        <a href="" className="text-xl">
                            Project
                        </a>
                        <a href="" className="text-xl">
                            Contact
                        </a>
                    </ul>
                </div>
            </nav>
            {/** Navbar */}

            {/** Body */}
            <body className="font-['Poppins']">
                {/** Hero */}
                <div className=" pt-10 h-100 mx-px-10 box-border flex min-w-fit justify-center ">
                    <div className="flex justify-center gap-10 h-1/5">
                        <div className="p-10 flex justify-center items-center ">
                            <img
                                src={perfil}
                                alt=""
                                className=" rounded-full h-[300px]"
                            />
                        </div>
                        <div className="p-10 flex justify-center items-center flex-col gap-4">
                            <div className=" flex justify-center items-center flex-col gap-2">
                                {" "}
                                <p className="text-xl font-medium text-gray-800">
                                    Hi here, 🧡{" "}
                                </p>
                                <h2 className="text-4xl font-semibold ">
                                    Bianca Espindola
                                </h2>
                                <p className="text-2xl font-medium tracking-wide text-gray-900">
                                    Frontend Developer
                                </p>
                            </div>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => window.open(resume)}
                                    className="relative border-2 bg-gray-50 border-gray-800 p-3 rounded-full px-6 hover:bg-gray-200 hover:border-gray-950 transition "
                                >
                                    Download CV
                                </button>

                                <button className=" bg-gray-900  text-gray-50 p-3 rounded-full px-6 hover:bg-black transition">
                                    Contact info
                                </button>
                            </div>
                            <div className=" flex justify-center gap-2">
                                <a
                                    className="text-3xl"
                                    target="_new"
                                    href="https://www.linkedin.com/in/biancadeespindola/"
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    className="text-3xl"
                                    target="_new"
                                    href="https://github.com/biancaespindola"
                                >
                                    <FaGithub />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/** /Hero */}

                {/** About */}
                <div className="about" id="about">
                    <p>Get To Know More</p>
                    <h2>About Me</h2>
                    <div className="container">
                        <div className="photo">
                            <img src={projects} alt="" />
                        </div>
                        <div className="about-details-container">
                            <div className="about">
                                <FaDesktop />
                                <h3>Experience</h3>
                                <p>
                                    4+ years <br /> Frontend Developer
                                </p>
                            </div>
                            <div className="details">
                                <FaBookReader />
                                <h3>Education</h3>
                                <p>
                                    Computer Engineer <br /> Universidade Federal de Santa
                                    Catarina
                                </p>
                            </div>
                        </div>
                        <div className="text-container">
                            <p>
                                I am a frontend developer with a passion for creating
                                visually appealing and user-friendly websites. I have a
                                strong understanding of HTML, CSS, and JavaScript, and
                                React.js.
                            </p>
                        </div>
                    </div>
                </div>

                {/** /About */}
            </body>
            {/** Body */}
        </>
    );
}

export default App;
