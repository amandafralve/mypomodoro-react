import { Input } from "../Input"
import { Cycles } from "../Cycles"
import { Button } from "../Button"
import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { useRef } from "react"
import type { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"
import { TaskActionTypes } from "../../Contexts/TaskContext/taskActions"
import { Tips } from "../Tips"

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const {state, dispatch} = useTaskContext();

    // ciclo
    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle);


    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement> ){
        event.preventDefault();
        

        if (taskNameInput.current === null) return;
        const taskName = taskNameInput.current.value.trim();

        if (!taskName){
            alert('Digite o nome da tarefa')
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        }

        dispatch({type: TaskActionTypes.START_TASK, payload: newTask })
    }

    function handleInterruptTask() {
        dispatch({type: TaskActionTypes.INTERRUPT_TASK })

    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action="">
            <div className="formRow">
                <Input 
                    id='meuInput' 
                    labelText='Task' 
                    type='text' 
                    placeholder='Escreva sua tarefa'
                    ref={taskNameInput} 
                    disabled={!!state.activeTask}
                    autoComplete="off"/>
            </div>

            <div className="formRow">
                <Tips/>
            </div>

            {state.currentCycle > 0 &&(
                <div className="formRow">
                    <Cycles/>
                </div>
            )}
            
            <div className="formRow">
                {!state.activeTask && (
                    <Button  
                        type='submit'
                        icon={<PlayCircleIcon />} 
                        color='green'
                        aria-label='Iniciar nova tarefa'
                        title='Iniciar nova tarefa'
                    />
                )}
                
                {!!state.activeTask &&(
                    <Button  
                        type='button'
                        icon={<StopCircleIcon />} 
                        color='red'
                        aria-label='Interromper tarefa atual'
                        title='Interromper tarefa atual'
                        onClick={handleInterruptTask}
                    />
                )}
            </div>
        </form>
    )
}