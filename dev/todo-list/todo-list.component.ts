import {Component, OnInit} from 'angular2/core';
import {Task} from './task';
import {TodoListService} from './todo-list.service';
import {TodoListEditComponent} from './todo-list-edit.component';
import {ALL_COMPLETED} from '../mock/todo-list';

@Component({
    selector:'my-todo-list',
    template: `
        <header>
            <nav>
            <h1>TODO-LIST</h1>
                <ul>

                   <li><a (click)="onAll()">All Tasks</a></li>
                   <li><a (click)="onActive()">Active Tasks</a></li>
                   <li><a (click)="onCompleted()">Completed Tasks</a></li>
                </ul>
            </nav>
        </header>

    <div class="main">
        <my-todo-list-edit *ngIf="isVisible" [task]="selectedItem" (isVisible)="onIsVisible($event)"></my-todo-list-edit>
        <div class="list">
            <h2>{{active}} Tasks</h2>
            <button class="btn" (click)="onAddItem()">Add new Task</button>
            <ul>
                <li *ngFor="#item of todoList" [ngClass]="{selected: item === selectedItem}">
                    <input type="checkbox" [checked]="item.isCompleted" (change)="onChange(item)">
                    <span  (click)="onClick(item)"  [ngClass]="{completed: item.isCompleted}">{{item.title}}</span>
                </li>
            </ul>
        </div>
        <br>
        <div *ngIf="done != 0">
            <h4>You have been complete {{done}} task already!!!</h4>
        </div>
        <br>
        <button class="btn danger" (click)="onDeleteAllCompleted()" *ngIf="allCompleted !== 0">Delete All Completed Task</button>
    </div>
    `,
    directives: [TodoListEditComponent],
    providers: [TodoListService],
})

export class TodoListComponent implements OnInit{
    todoList: Task[];
    selectedItem: Task = null;
    isVisible: boolean = false;
    active: string = 'All';
    done = ALL_COMPLETED;
    allCompleted = this._todoListService.getAllCompletedTasks().length;


    constructor(private _todoListService: TodoListService){}


    ngOnInit():any {
        this.todoList = this._todoListService.getAllTasks();
    }

    onAddItem(){
        this.selectedItem = null;
        this.isVisible = true;
    }

    onChange(item: Task){
        this._todoListService.changeTask(item);
        if (this.active === 'All') {
            this.todoList = this._todoListService.getAllTasks();
        } else if (this.active === 'Active') {
            this.todoList = this._todoListService.getAllActiveTasks();
        } else if (this.active === 'Completed') {
            this.todoList = this._todoListService.getAllCompletedTasks();
        }
        this.done = ALL_COMPLETED;
        this.allCompleted = this._todoListService.getAllCompletedTasks().length;
    }

    onClick(item: Task){
        this.selectedItem = item;
        console.log(item);
        this.isVisible = true;
    }

    onIsVisible(b:boolean){
        this.isVisible = b;
        this.selectedItem = null;
        this.allCompleted = this._todoListService.getAllCompletedTasks().length;
        this.done = ALL_COMPLETED;
    }

    onAll(){
        this.todoList = this._todoListService.getAllTasks();
        this.active = 'All';
        this.isVisible = null;
        this.selectedItem = null;
    }
    onActive(){
        this.todoList = this._todoListService.getAllActiveTasks();
        this.active = 'Active';
        this.isVisible = null;
        this.selectedItem = null;
    }

    onCompleted(){
        this.todoList = this._todoListService.getAllCompletedTasks();
        this.active = 'Completed';
        this.isVisible = null;
        this.selectedItem = null;
    }

    onDeleteAllCompleted(){
        this._todoListService.deleteAllCompletedTasks();
        this.todoList = this._todoListService.getAllTasks();
        this.isVisible = null;
        this.selectedItem = null;
        this.allCompleted = this._todoListService.getAllCompletedTasks().length;

    }
}