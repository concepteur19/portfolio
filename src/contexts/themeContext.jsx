import React, { createContext, useContext, useMemo, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'

const ThemeContext = createContext({ isDarkTheme: false, toggleTheme: () => {} })

const readStoredTheme = () => {
    try {
        return localStorage.getItem(STORAGE_KEY)
    } catch {
        return null
    }
}

const applyTheme = (isDark) => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = isDark ? 'dark' : 'light'
}

// The theme lives on <html class="dark">, set before the first paint by the inline
// script of _document.tsx. React only subscribes to that class.
const subscribe = (onChange) => {
    const observer = new MutationObserver(onChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystem = (event) => {
        if (!readStoredTheme()) applyTheme(event.matches)
    }
    media.addEventListener('change', followSystem)

    return () => {
        observer.disconnect()
        media.removeEventListener('change', followSystem)
    }
}

const getSnapshot = () => document.documentElement.classList.contains('dark')
const getServerSnapshot = () => false

const toggleTheme = () => {
    const next = !getSnapshot()
    applyTheme(next)
    try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
        // Storage blocked (private mode): the choice lasts for this page only.
    }
}

export const ThemeProvider = ({ children }) => {

    const isDarkTheme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
    const value = useMemo(() => ({ isDarkTheme, toggleTheme }), [isDarkTheme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext

export const useTheme = () => {
    return useContext(ThemeContext)
}
