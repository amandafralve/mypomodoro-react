import { Container } from './components/Container';
import { Countdown } from './components/Countdown';
import { Input } from './components/Input';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import './styles/global.css'
import './styles/theme.css'


export function App(){
    return ( 
        <>  
            <Container>
                <Logo />
            </Container>

            <Container>
                <Menu />
            </Container>

            <Container>
                <Countdown />
            </Container>

            <Container>
                <form className='form' action="">
                    <div className="formRow">
                        <Input id='meuInput' labelText='Task' type='text' placeholder='Type your task'/>
                    </div>
                    <div className="formRow">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="formRow">
                        <p>Ciclos</p>
                        <p>00000</p>
                    </div>
                    <div className="formRow">
                        <button>Envia</button>
                    </div>
                </form>
            </Container>
            
        </>

    );
}
