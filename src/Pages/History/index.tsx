import { TrashIcon } from 'lucide-react';
import { MainTemplate } from '../../Templates/MainTemplates';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import styles from './styles.module.css';
import { useTaskContext } from '../../Contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks } from '../../utils/sortTasks';
import type { SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useMemo, useState } from 'react';
import { TaskActionTypes } from '../../Contexts/TaskContext/taskActions';
import '../../styles/global.css';
import '../../styles/theme.css';
import { toastifyAdapter } from '../../components/adapters/toastifyAdapter';

export function History() {
    const { state, dispatch } = useTaskContext();

    const hasTasks = state.tasks.length > 0;

    const [sortTasksOptions, setSortTaskOptions] = useState<
        Pick<SortTasksOptions, 'field' | 'direction'>
    >({
        field: 'startDate',
        direction: 'desc',
    });

    const sortedTasks = useMemo(() => {
        return sortTasks({
            tasks: state.tasks,
            field: sortTasksOptions.field,
            direction: sortTasksOptions.direction,
        });
    }, [
        state.tasks,
        sortTasksOptions.field,
        sortTasksOptions.direction,
    ]);

    useEffect(() => {
        document.title = 'Histórico - My Pomodoro';
    }, []);

    useEffect(() => {
        return () => {
            toastifyAdapter.dismiss();
        };
    }, []);

    function handleSortTasks({
        field,
    }: Pick<SortTasksOptions, 'field'>) {
        const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

        setSortTaskOptions({
            field,
            direction: newDirection,
        });
    }

    function handleResetHistory() {
        toastifyAdapter.confirm(
            'Deseja apagar todo o histórico?',
            confirmation => {
                if (confirmation) {
                    dispatch({ type: TaskActionTypes.RESET_STATE });
                }
            },
        );
    }

    return (
        <MainTemplate>
            <Container>
                <Heading>
                    <span><h2>History</h2></span>

                    {hasTasks && (
                        <span className={styles.buttonContainer}>
                            <Button
                                icon={<TrashIcon />}
                                color="red"
                                aria-label="Apagar todo o histórico"
                                title="Apagar histórico"
                                onClick={handleResetHistory}
                            />
                        </span>
                    )}
                </Heading>
            </Container>

            <Container>
                {hasTasks && (
                    <div className={styles.responsiveTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        onClick={() =>
                                            handleSortTasks({
                                                field: 'name',
                                            })
                                        }
                                        className={styles.thSort}
                                    >
                                        Tarefa ⇅
                                    </th>

                                    <th
                                        onClick={() =>
                                            handleSortTasks({
                                                field: 'duration',
                                            })
                                        }
                                        className={styles.thSort}
                                    >
                                        Duração ⇅
                                    </th>

                                    <th
                                        onClick={() =>
                                            handleSortTasks({
                                                field: 'startDate',
                                            })
                                        }
                                        className={styles.thSort}
                                    >
                                        Data ⇅
                                    </th>

                                    <th>Status</th>

                                    <th>Tipo</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sortedTasks.map(task => {
                                    const taskTypeDictionary = {
                                        workTime: 'Foco',
                                        shortBreakTime:
                                            'Descanso curto',
                                        longBreakTime:
                                            'Descanso longo',
                                    };

                                    return (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>

                                            <td>
                                                {task.duration}min
                                            </td>

                                            <td>
                                                {formatDate(
                                                    task.startDate,
                                                )}
                                            </td>

                                            <td>
                                                {getTaskStatus(
                                                    task,
                                                    state.activeTask,
                                                )}
                                            </td>

                                            <td>
                                                {
                                                    taskTypeDictionary[
                                                        task.type
                                                    ]
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {!hasTasks && (
                    <p
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        Ainda não existem tarefas criadas.
                    </p>
                )}
            </Container>
        </MainTemplate>
    );
}