import { Input } from "../Input"
import { Cycles } from "../Cycles"
import { Button } from "../Button"
import { PlayCircleIcon } from "lucide-react"
import { useRef } from "react"
import type { TaskModel } from "../../models/TaskModel"
import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes"


export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);
    const {state, setState} = useTaskContext();

    // ciclo
    const nextCycle = getNextCycle(state.currentCycle)
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement> ){
        event.preventDefault();
        console.log("Certo")

        if (taskNameInput.current === null) return;
        const taskName = taskNameInput.current.value.trim();

        if (!taskName){
            alert('Digite o nome da tarefa')
            return;
        }

        const newTask: TaskModel = {
            id: Date.now.toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType
        }

        const secondsRemaining = newTask.duration*60;
        setState(prevState => {
            return {
                ...prevState,
                config: { ...prevState.config },
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [...prevState.tasks, newTask]
            }
        })
    }

    return (
        <form onSubmit={handleCreateNewTask} className='form' action="">
            
            <div className="formRow">
                <Input 
                    id='meuInput' 
                    labelText='Task' 
                    type='text' 
                    placeholder='Type your task'
                    ref={taskNameInput} />
            </div>

            <div className="formRow">
                <p>O próximo intervalo é de c min</p>
            </div>

            <div>
                <Cycles/>
            </div>

            <div className="formRow">
                <Button icon={<PlayCircleIcon />} color='green'/>
            </div>
        </form>
    )
}