export class Task {
    title: string;
    isCompleted: boolean;

    constructor(title: string, isCompleted: boolean){
        this.title = title;
        this.isCompleted = isCompleted;
    }
}