
import { Container } from './components/Container';
import { Heading } from './components/Heading';
import { Logo } from './components/Logo/Logo';
import './styles/global.css'
import './styles/theme.css'


export function App(){
    return ( 
        <>  
            <Container>
                <Logo />
                <Heading>MENU</Heading>
            </Container>
            
        </>

    );
}
