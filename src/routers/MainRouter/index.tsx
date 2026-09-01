import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AboutPomodoro } from "../../Pages/AboutPomodoro";
import { NotFound } from "../../Pages/NotFound";
import { useEffect } from "react";
import { Home } from "../../Pages/Home";
import { History } from "../../Pages/History";

function ScrollToTop(){
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])

    return null;
}

export function MainRouter () {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/about-pomodoro' element={<AboutPomodoro />}/>
                <Route path='/history' element={<History />}/>
                <Route path='/settings' element={<History />}/>
                <Route path='*' element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}