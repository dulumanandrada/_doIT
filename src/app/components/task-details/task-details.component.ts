import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  dates: Date[] = undefined as unknown as Date[]
  formGroup: FormGroup = new FormGroup({
    date: new FormControl<Date | null>(null)
  });

  date: Date | null | undefined | Event

  constructor(private router: Router, private tasksService: TasksService) {
    this.idTask = +this.router.url.split('/')[2]
    this.getTask(this.idTask)
  }

  ngOnInit(): void {
    
  }

  getTask(id: number) {
    this.tasksService.getTaskById(id).subscribe({
      next: (res) => {
        this.task = res
      },

      complete: () => {
        let d = new Date(this.task.assignDate)
        this.dates = [d]
        d.setDate(d.getDate()+1)
        for(let d = new Date(this.task.assignDate); d <= new Date(this.task.deadLine); d.setDate(d.getDate()+1))
          this.dates.push(new Date(d))
      }
    })
  }

}
