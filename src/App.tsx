import { TaskContextProvider } from './Contexts/TaskContext/TaskContextProvider';
import './styles/global.css'
import './styles/theme.css'
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';

export function App(){
    return (
        <TaskContextProvider>         
            <MessagesContainer>
                <MainRouter/>
            </MessagesContainer>
        </TaskContextProvider>
    );
}