import {Injectable} from 'angular2/core';
import {Task} from './task';
import {TODO_LIST, ALL_COMPLETED} from '../mock/todo-list';

@Injectable()

export class TodoListService {

    getAllTasks(){
        return TODO_LIST;
    }

    getAllActiveTasks(){
       let active: Task[] = [];
        for(let i= 0; i < TODO_LIST.length; i++){
            if (!TODO_LIST[i].isCompleted){
                active.push(TODO_LIST[i]);
            }
        }
        return active;
    }

    getAllCompletedTasks(){
       let completed: Task[] = [];
        for(let i= 0; i < TODO_LIST.length; i++){
            if (TODO_LIST[i].isCompleted){
                completed.push(TODO_LIST[i]);
            }
        }
        return completed;
    }

    getTask(index: number){
        return TODO_LIST[index];
    }

    getIndexOfTask(task: Task){
        return TODO_LIST.indexOf(task);
    }

    insertTask(task: Task){
        TODO_LIST.push(task);
        if (task.isCompleted){
            ALL_COMPLETED += 1;
        }
    }

    deleteTask(task: Task){
        TODO_LIST.splice(TODO_LIST.indexOf(task), 1);
    }

    deleteAllCompletedTasks(){
        let activeOnly: Task[] = [];
        for(let i = 0; i < TODO_LIST.length; i++){
            if (!TODO_LIST[i].isCompleted)
            activeOnly.push(TODO_LIST[i]);
        }
        TODO_LIST = activeOnly;

    }

    updateTask(index: number, task: Task){
        TODO_LIST[index].title = task.title;
    }

    changeTask(task: Task){
        let isComplete: boolean = TODO_LIST[TODO_LIST.indexOf(task)].isCompleted;
        TODO_LIST[TODO_LIST.indexOf(task)].isCompleted = !isComplete;
        if (!isComplete)
            ALL_COMPLETED+=1;
        else
            ALL_COMPLETED -= 1;

    }
}