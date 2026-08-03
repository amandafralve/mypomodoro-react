import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startDate: number; 
    completeDate: number | null ; // qnd timer chega ao final
    interruptDate: number | null; // qnd a task for interrompida
    type: keyof TaskStateModel['config']

}