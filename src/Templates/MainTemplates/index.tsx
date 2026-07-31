import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';

import '../../styles/global.css'
import '../../styles/theme.css'

type MainTemplateProps = {
    children: React.ReactNode;
}

export function MainTemplate({children}: MainTemplateProps){
    return ( 
        <>  
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            {children}

            <Container>
                <Footer></Footer>            
            </Container>
            
        </>

    );
}
