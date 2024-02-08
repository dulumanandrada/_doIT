import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit{
  tasks: ITask[] = []

  constructor(private router: Router, private tasksService: TasksService) {
    this.getTasks()
  }

  ngOnInit(): void {
  }

  getTasks(){
    this.tasksService.getTasks().subscribe(
      {
        next: (res) => {
          this.tasks = res.filter(t => t.forUsername === sessionStorage.getItem('user'))
        }
      }
    )
  }

  navigateToTaskDetails(task: ITask) {
    this.router.navigate(['board/' + task.id])
  }
}
