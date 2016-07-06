import {Component, EventEmitter} from 'angular2/core';
import {Task} from './task';
import {TodoListService} from './todo-list.service';

@Component({
    selector: 'my-todo-list-edit',
    template: `
    <h1>{{task === null? 'Add new' : 'Edit'}} task</h1>
    <form id="todo-list-add" (ngSubmit)="onSubmit(f.value)" #f="ngForm">
        <label for="task-isCompleted"></label>
        <input type="checkbox" id="task-isCompleted" [checked]="task?.isCompleted" ngControl="isCompleted">
        <label for="task-title">Task title: </label>
        <input type="text" id="task-title" required value="{{task?.title}}" ngControl="title">
        <button class="btn" type="submit">{{task === null ? 'Add' : 'Edit'}}</button>
        <button class="btn danger" *ngIf="task !== null" (click)="onDelete()">Delete Task</button>
    </form>
    `,
    inputs: ['task'],
    outputs: ['isVisible'],
    styleUrls: ['src/css/todo-list.css'],

})

export class TodoListEditComponent{
    task: Task;
    isVisible = new EventEmitter<boolean>();

    constructor(private _todoListService: TodoListService){}

    onSubmit(item: Task){

        if (this.task !== null){
            if (item.title === null) {
                item.title = this.task.title;
            }
            this._todoListService.updateTask(this._todoListService.getIndexOfTask(this.task), item);
        } else {
             this._todoListService.insertTask(item);
        }

        this.isVisible.emit(false);
    }

    onDelete(){
        this._todoListService.deleteTask(this.task);
        this.task = null;
        this.isVisible.emit(false);
    }

}