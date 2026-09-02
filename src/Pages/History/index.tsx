
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
import { sortTasks } from '../../utils/sortTasks';
import type { SortTasksOptions } from '../../utils/sortTasks';
import { useState } from 'react';

export function History() {
    const { state } = useTaskContext();
    
    const [sortTasksOptions, setSortTasksOptions] = useState<SortTasksOptions>(() => {
        return {
            tasks: sortTasks({
                tasks: state.tasks,
                field: 'startDate',
                direction: 'desc'
            }),
            field: 'startDate',
            direction: 'desc'
        }
    });

    function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

        setSortTasksOptions({
            tasks: sortTasks({
                direction: newDirection,
                tasks: sortTasksOptions.tasks,
                field
            }),
            direction: newDirection,
            field,
        });
    }

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
                                <th className={styles.thSort} onClick={() => handleSortTasks({ field: "name"})}>Tarefa ⇅</th>
                                <th className={styles.thSort} onClick={() => handleSortTasks({ field: "duration"})}>Duração ⇅</th>
                                <th className={styles.thSort} onClick={() => handleSortTasks({ field: "startDate"})}>Data ⇅</th>
                                <th>Status</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortTasksOptions.tasks.map(task => {
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

