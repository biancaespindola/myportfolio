import { useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa6";
{
    /** Estudando state e useState ao clicar no botão dark uma arrow function é usada para alterar o estado
     * * interno do darkModeOn. Seu valor inicial é "false" e quando clicado, o valor do darkModeOn será alterado para
     * * "true". dentro do botão temos um icone de lua e um icone de sol. que são alterados conforme o valor de darkModeOn
     * * para mais referencias ler https://react.dev/reference/react/useState
     */
}

function ModeToggler() {
    const [darkModeOn, setDarkModeOn] = useState(false);
    const darkMode = <FaMoon />;
    const lightMode = <FaSun />;

    return (
        <>
            <button onClick={() => setDarkModeOn(!darkModeOn)}>
                {darkModeOn ? darkMode : lightMode}
            </button>
        </>
    );
}

export default ModeToggler;
