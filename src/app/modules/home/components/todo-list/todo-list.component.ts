import { Component, DoCheck } from '@angular/core';

import { Task } from '../../model/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{
  public taskList: Task[] = JSON.parse(localStorage.getItem('taskList') || '[]');

  ngDoCheck() {
    this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
    localStorage.setItem('taskList', JSON.stringify(this.taskList))
  }

  public deleteItemTaskList(index: number): void {
    this.taskList.splice(index, 1)
  }

  public deleteAllTaskList(): void {
    const confirm = window.confirm('Você tem certeza que deseja deletar todos os itens?')

    if(!confirm) return

    this.taskList = []
  }

  public setEmitTaskList(task: string): void {
    this.taskList.push({ name: task, checked: false })
  }

  public validateInput(text: string, index: number) {
    if(text) return

    const confirm = window.confirm('Você tem certeza que deseja deletar esse item?')

    if(confirm) this.deleteItemTaskList(index)
  }
}
