import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    return (
        <ThemeContext.Provider value={{isDarkTheme, setIsDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext

export const useTheme = () => {
    return useContext(ThemeContext)
}