import { useEffect } from 'react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { RouterLink } from '../../components/RouterLink';

import '../../styles/global.css'
import '../../styles/theme.css'


export function NotFound(){
    useEffect(() => {
        document.title = '404 Página não encontrada'
    },[])

    return ( 
        <MainTemplate >
            <Container>
                <Heading>404 - Página não encontrada </Heading>
                <p>
                    Opa! Parece que a página que você está tentando acessar não existe.
                    Talvez ela tenha tirado férias, resolvido explorar o universo ou se
                    perdido em algum lugar entre dois buracos negros. 
                </p>
                <p>
                    Mas calma, você não está perdido no espaço (ainda). Dá pra voltar em
                    segurança para a <RouterLink href='/'>página principal</RouterLink>{' '}
                    ou <a href='/history/'>para o histórico</a> — ou
                    pode ficar por aqui e fingir que achou uma página secreta que só os
                    exploradores mais legais conseguem acessar. 
                </p>
                <p>
                    Se você acha que essa página deveria existir (ou se quiser bater um
                    papo sobre viagem no tempo e buracos de minhoca), é só entrar em
                    contato. Caso contrário, use o menu para voltar ao mundo real.
                </p>

            </Container>
        </MainTemplate>
    );
}
