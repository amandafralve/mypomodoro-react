
import { HistoryIcon, House, MoonIcon, Settings, SunIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
    const [theme, setTheme] = useState<AvailableThemes>(() => {
        const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'light';
        return storageTheme;
    });
    
    function handleThemeChange(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ){
        event.preventDefault(); // para não seguir o link no href

        setTheme(prevTheme => {
            const nextTheme = prevTheme == 'light' ? 'dark' : 'light';
            return nextTheme;
        })
    }

    const nextThemeIcon  = {
        dark: <SunIcon/>,
        light: <MoonIcon/>,
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme)
    }, [theme]);

    return (
        <nav className={styles.menu}>
            <RouterLink className={styles.menuLink} href="/" aria-label='Ir para início' title='Início'>
                <House />
            </RouterLink>

            <RouterLink className={styles.menuLink} href="/history" aria-label='Ir para Histórico' title='Histórico'>
                <HistoryIcon />
            </RouterLink>

            <RouterLink className={styles.menuLink} href="/settings" aria-label='Ir para configurações' title='Configurações'>
                <Settings />
            </RouterLink>

            <a className={styles.menuLink} href="#" aria-label='Mudar tema' title='Tema'
                onClick={handleThemeChange}>
                {nextThemeIcon[theme]}
            </a>
            
        </nav>
    )
}