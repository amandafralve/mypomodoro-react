import { useEffect } from 'react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { AboutTechnique } from '../../components/AboutTechnique';
import { Container } from '../../components/Container';

import '../../styles/global.css'
import '../../styles/theme.css'


export function AboutPomodoro(){
    useEffect(() => {
        document.title = 'Entenda a técnica Pomodoro - My Pomodoro'
    },[])
    
    return ( 
        <MainTemplate >
            <Container>
                <AboutTechnique />
            </Container>
        </MainTemplate>
    );
}
