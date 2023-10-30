import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  idTask: number
  task: ITask = {} as ITask

  constructor(private router: Router, private tasksService: TasksService) {
    this.idTask = +this.router.url.split('/')[2]
    this.getTask(this.idTask)
  }

  ngOnInit(): void {

  }

  getTask(id: number) {
    this.tasksService.getTaskById(id).subscribe({
      next: (res) => this.task = res
    })
  }

}
