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
                    <div className="border p-10 flex justify-center items-center ">
                        <img src={perfil} alt="" className=" rounded-full h-[300px]" />
                    </div>
                    <div className="border p-10 flex justify-center items-center flex-col gap-4">
                        <div className=" flex justify-center items-center flex-col gap-2">
                            {" "}
                            <p className="text-xl font-medium">Hi here, 🧡 </p>
                            <h2 className="text-4xl font-bold">Bianca Espindola</h2>
                            <p className="text-2xl font-medium">Frontend Developer</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <button className="relative border-2 border-gray-900 p-3 rounded-full px-6 ">
                                Download CV
                            </button>
                            <button className=" bg-gray-900  text-gray-200 p-3 rounded-full px-6">
                                Contact info
                            </button>
                        </div>
                        <div className="">
                            <button>linkedin</button>
                            <button>github</button>
                        </div>
                    </div>
                </div>
            </body>
            {/** Header */}
        </>
    );
}

export default App;
