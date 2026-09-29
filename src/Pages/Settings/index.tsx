
import { SaveIcon } from 'lucide-react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Input } from '../../components/Input';

import '../../styles/global.css'
import '../../styles/theme.css'
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { toastifyAdapter } from '../../components/adapters/toastifyAdapter';
import { TaskActionTypes } from '../../Contexts/TaskContext/taskActions';


export function Settings(){
    const {state, dispatch} = useTaskContext();
    const workTimeInputRef = useRef<HTMLInputElement>(null);
    const shortBreakInputRef = useRef<HTMLInputElement>(null);
    const longBreakInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = 'Configurações - My Pomodoro'
    },[])
    
    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formErrors = [];

        const workTime = Number(workTimeInputRef.current?.value);
        const shortBreakTime = Number(shortBreakInputRef.current?.value);
        const longBreakTime = Number(longBreakInputRef.current?.value);
        toastifyAdapter.dismiss();

        if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)){
            formErrors.push('Digite apenas números em todos os campos');
            
        }
        
        if(workTime < 1 || workTime > 99 ){
            formErrors.push('Digite valores entre 1 e 99 para Foco.');
        }
        if(shortBreakTime < 1 || shortBreakTime > 30 ){
            formErrors.push('Digite valores entre 1 e 30 para Descanso Curto.');
        }
        if(longBreakTime < 1 || longBreakTime > 60 ){
            formErrors.push('Digite valores entre 1 e 60 para Descanso Longo.');
        }

        if(formErrors.length > 0){
            formErrors.forEach(error => {
                toastifyAdapter.error(error);
            })
        }

        dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload: {workTime, shortBreakTime, longBreakTime}});
        toastifyAdapter.success('Configurações salvas');
    }

    return ( 
        <MainTemplate >
            <Container>
                <Heading>
                    <span><h2>Configurações</h2></span>
                </Heading>
            </Container>

            <Container>
                <p>Modifique as configurações para tempo de foco, descnso curto e descanso longo</p>
            </Container>

            <Container>
                <form onSubmit={handleSaveSettings} action="" className='form'>
                    <div className='formRow'>
                        <Input id='workTime' labelText='Foco' ref={workTimeInputRef} defaultValue={state.config.workTime} type='number'></Input>
                    </div>
                    <div className='formRow'>
                        <Input id='shortBreakTime' labelText='Descanso Curto' ref={shortBreakInputRef} defaultValue={state.config.shortBreakTime} type='number'></Input>
                    </div>
                    <div className='formRow'>
                        <Input id='longBreakTime' labelText='Descanso Longo' ref={longBreakInputRef} defaultValue={state.config.longBreakTime} type='number'></Input>
                    </div>
                    <div className='formRow'>
                        <Button icon={<SaveIcon/>} aria-label='Salvar Configurações' title='Salvar Configurações'></Button>
                    </div>
                </form>
            </Container>
        </MainTemplate>
    );
}
