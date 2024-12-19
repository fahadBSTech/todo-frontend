'use client';

import axios from 'axios';
import { CreateTask, Task, UpdateTask } from '@/types/task';
import { useCallback, useEffect, useState } from 'react';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface TaskStoreState {
    tasks: Task[];
    taskCount: number;
    completedTaskCount: number;
    loading: boolean;
}

export const useTasks = () => {
    const [state, setState] = useState<TaskStoreState>({
        tasks: [],
        taskCount: 0,
        completedTaskCount: 0,
        loading: false,
    });

    const handleTasksGet = useCallback(async () => {
        setState(prevState => ({ ...prevState, loading: true }));
        try {
            const response = await api.get('/tasks/');
            const completeTaskCount = response.data.data.filter((task: Task) => task.completed).length;
            setState({
                tasks: response.data.data,
                taskCount: response.data.count,
                completedTaskCount: completeTaskCount,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setState(prevState => ({ ...prevState, loading: false }));
        }
    }, []);

    const handleTaskDelete = useCallback(async (taskId: number) => {
        setState(prevState => ({ ...prevState, loading: true }));
        try {
            await api.delete(`/tasks/${taskId}`);
            updateStateAfterTaskDelete(taskId);
            setState(prevState => ({ ...prevState, loading: false }));
        } catch (error) {
            console.error('Error deleting task:', error);
            setState(prevState => ({ ...prevState, loading: false }));
        }
    }, []);

    const updateStateAfterTaskDelete = (taskId: number) => {
        setState((prevState) => {
            const taskToDelete = prevState.tasks.find(task => task.id === taskId);
            const isCompleted = taskToDelete ? taskToDelete.completed : false;
            return {
                tasks: prevState.tasks.filter(task => task.id !== taskId),
                taskCount: prevState.taskCount - 1,
                completedTaskCount: isCompleted ? prevState.completedTaskCount - 1 : prevState.completedTaskCount,
                loading: prevState.loading,
            };
        });
    };

    const handleTaskUpdate = useCallback(async (taskId: number, updateTaskBody: UpdateTask) => {
        setState(prevState => ({ ...prevState, loading: true }));
        try {
            const response = await api.put(`/tasks/${taskId}`, updateTaskBody);
            const updatedTask = response.data;
            setState((prevState) => {
                const tasks = prevState.tasks.map(task =>
                    task.id === taskId ? updatedTask : task
                );
                const completedTaskCount = tasks.filter(task => task.completed).length;
                return {
                    ...prevState,
                    tasks,
                    completedTaskCount,
                    loading: false,
                };
            });
        } catch (error) {
            console.error('Error updating task:', error);
            setState(prevState => ({ ...prevState, loading: false }));
        }
    }, []);

    const handleTaskPost = useCallback(async (task: CreateTask) => {
        setState(prevState => ({ ...prevState, loading: true }));
        try {
            const response = await api.post('/tasks/', task);
            const newTask = response.data;
            setState((prevState) => ({
                tasks: [...prevState.tasks, newTask],
                taskCount: prevState.taskCount + 1,
                completedTaskCount: newTask.completed ? prevState.completedTaskCount + 1 : prevState.completedTaskCount,
                loading: false,
            }));
        } catch (error) {
            console.error('Error posting task:', error);
            setState(prevState => ({ ...prevState, loading: false }));
        }
    }, []);

    useEffect(() => {
        handleTasksGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { handleTasksGet, handleTaskDelete, handleTaskUpdate, handleTaskPost, setState, ...state };
};
