import resume from "./assets/resumeBianca.pdf";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import perfil from "./assets/perfil.jpg";
function App() {
    return (
        <>
            {/** Navbar */}
            <nav
                id="desktop-navbar"
                className="p-10 flex justify-around items-center font-['Poppins']"
            >
                <div id="logo">
                    <h1 className="text-2xl font-semibold">Bianca Espindola</h1>
                </div>
                <div>
                    <ul className="flex gap-10 ">
                        <a href="" className="text-xl ">
                            Home
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

            {/** Header */}
            <body>
                <div className="grid grid-cols-2">
                    <div className="p-10 flex justify-center items-center ">
                        <img src={perfil} alt="" className=" rounded-full h-[300px]" />
                    </div>
                    <div className="p-10 flex justify-center items-center flex-col gap-4">
                        <div className=" flex justify-center items-center flex-col gap-2">
                            {" "}
                            <p className="text-xl font-medium text-gray-800">
                                Hi here, 🧡{" "}
                            </p>
                            <h2 className="text-4xl font-semibold ">Bianca Espindola</h2>
                            <p className="text-2xl font-medium tracking-wide text-gray-900">
                                Frontend Developer
                            </p>
                        </div>
                        <div className="flex justify-center gap-2">
                            {/* <a
                                href="src\assets\CVBiancaEspindola.pdf"
                                download="resume"
                                target="_blank"
                                rel="noreferrer"
                            > */}
                            <button
                                onClick={() => window.open(resume)}
                                className="relative border-2 bg-gray-50 border-gray-800 p-3 rounded-full px-6 hover:bg-gray-200 hover:border-gray-950 transition "
                            >
                                Download CV
                            </button>
                            {/* </a> */}
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
            </body>
            {/** Header */}
        </>
    );
}

export default App;
