import { Home } from './Pages/Home';
import { TaskContextProvider } from './Contexts/TaskContext/TaskContextProvider';
import './styles/global.css'
import './styles/theme.css'
import { MessagesContainer } from './components/MessagesContainer';

export function App(){
    return (
        <TaskContextProvider>
            <MessagesContainer>
                <Home />
            </MessagesContainer>
        </TaskContextProvider>
    );
}