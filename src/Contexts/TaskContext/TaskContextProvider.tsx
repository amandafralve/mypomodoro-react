import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TaskActionTypes } from './taskActions';
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { TimerWorkerManager } from '../../workers/timerWorkerManager';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state');
        if (storageState === null) return initialTaskState;
        const parsedStorageState = JSON.parse(storageState) as TaskStateModel;
        return {
            ...parsedStorageState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });

    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
    const workerRef = useRef(TimerWorkerManager.getInstance());
    const stateRef = useRef(state);

    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    
    // registra o handler de mensagens uma única vez
    useEffect(() => {
        workerRef.current.onmessage((e) => {
            const countDownSeconds = e.data as number;

            if (countDownSeconds <= 0) {
                if (playBeepRef.current) {
                    playBeepRef.current();
                    playBeepRef.current = null;
                }
                dispatch({ type: TaskActionTypes.COMPLETE_TASK });
            } else {
                dispatch({
                    type: TaskActionTypes.COUNT_DOWN,
                    payload: { secondsRemaining: countDownSeconds },
                });
            }
        });
    }, []);

    // salva no localStorage e atualiza o título a cada mudança de estado
    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state));
        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    }, [state]);

    // manda mensagem pro worker só quando a tarefa ativa MUDA
    // (início, interrupção ou conclusão) — não a cada segundo
    useEffect(() => {
        workerRef.current.postMessage(stateRef.current);
    }, [state.activeTask?.id]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else if (!state.activeTask) {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}