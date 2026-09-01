
import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import styles from './styles.module.css'
import '../../styles/global.css'
import '../../styles/theme.css'
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';


export function History(){;
    const {state} = useTaskContext();
    const sortTasks = [...state.tasks].sort((a,b)=>{
        return b.startDate - a.startDate;
    });

    return ( 
        <MainTemplate >
            <Container>
                <Heading>
                    <span>History</span>
                    <span className={styles.buttonContainer}>
                        <Button 
                            icon={<TrashIcon/>}
                            color='red' 
                            aria-label='Apagar todo o histórico'
                            title='Apagar histórico'
                        />
                    </span>
                </Heading>
            </Container>

            <Container>
                <div className={styles.responsiveTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Tarefa</th>
                                <th>Duração</th>
                                <th>Data</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortTasks.map(task => {
                                const taskTypeDictionary = {
                                    workTime: 'Foco',
                                    shortBreakTime: 'Descanso Curto',
                                    longBreakTime: 'Descanso Longo',
                                };

                                return (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td>{task.duration}</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{getTaskStatus(task, state.activeTask)}</td>
                                        <td>{taskTypeDictionary[task.type]}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Container>
        </MainTemplate>
    );
}
