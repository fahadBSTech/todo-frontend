export interface Task {
    id: number;
    title: string;
    color: string;
    completed: boolean;
};

export type CreateTask = {
    title: string;
    color: string;
};

export type UpdateTask = {
    title?: string;
    color?: string;
    completed?: boolean;
};


export type GetTaskResponse = {
    data: Task[];
    count: number;
};