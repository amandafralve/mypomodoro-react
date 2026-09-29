
import { useEffect } from 'react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { Container } from '../../components/Container';
import { Countdown } from '../../components/Countdown';
import { MainForm } from '../../components/MainForm';

import '../../styles/global.css'
import '../../styles/theme.css'


export function Home(){;
    useEffect(() => {
        document.title = 'My Pomodoro - Home'
    },[])

    return ( 
        <MainTemplate >
            <Container>
                <Countdown />
            </Container>

            <Container>
                <MainForm />
            </Container>
        </MainTemplate>
    );
}
