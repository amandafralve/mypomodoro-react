import { MainTemplate } from '../../Templates/MainTemplates';
import { AboutTechnique } from '../../components/AboutTechnique';
import { Container } from '../../components/Container';

import '../../styles/global.css'
import '../../styles/theme.css'


export function AboutPomodoro(){
    return ( 
        <MainTemplate >
            <Container>
                <AboutTechnique />
            </Container>
        </MainTemplate>
    );
}
