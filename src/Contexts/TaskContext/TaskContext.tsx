import type { TaskActionModel } from './taskActions';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';
import { createContext } from 'react';

type TaskContextProps = {
    state: TaskStateModel,
    dispatch: React.Dispatch<TaskActionModel>;
}

const initialContextValue = { 
    state: initialTaskState,
    dispatch: () => {},
}

export const TaskContext = createContext<TaskContextProps>(initialContextValue);