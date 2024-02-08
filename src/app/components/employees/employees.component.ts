import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ITask } from 'src/app/models/task';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  users: IUser[] = []
  allTasks: ITask[] = []
  visibleAssignTask: boolean = false 
  userAssignTask: IUser = {} as IUser
  assignTaskForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    deadLine: new FormControl(null),
    details: new FormControl(null),
    // checklist
  })

  constructor(private userService: AuthService, private taskService: TasksService) {
    this.userService.getUsers().then((res) => {
      this.users = res
    })
    this.getTasks()
  }

  ngOnInit() {
    
  }

  getTasks() {
    this.taskService.getTasks().subscribe(
      {
        next: (res) => {
          this.allTasks = res
        }
      }
    )
  }

  getUserTasks(username: string): ITask[] {
    return this.allTasks.filter(t => t.forUsername === username) 
  }

  getUsers() {
    this.userService.getUsers().then((res) => {
      this.users = res
    })
  }

  showAssignTask(user: IUser) {
    this.visibleAssignTask = true
    this.userAssignTask = user
  }

  closeAssignTask() {
    this.visibleAssignTask = false
    this.assignTaskForm.reset()
  }

  assignTask() {
    let newTask: ITask = {} as ITask
    newTask.fromUsername = sessionStorage.getItem('user') as string
    newTask.forUsername = this.userAssignTask.username
    newTask.assignDate = new Date(Date.now()).toISOString().slice(0, 10)
    newTask.progress = 0
    newTask.status = {
      "id": 4,
      "message": "just assigned"
    }
    newTask.accepted = 2
    newTask.checkList = []
    newTask.title = this.assignTaskForm.get('title')?.value
    newTask.details = this.assignTaskForm.get('details')?.value
    newTask.deadLine = this.assignTaskForm.get('deadLine')?.value.toISOString().slice(0, 10)

    console.log(newTask);
    this.taskService.addTask(newTask).subscribe({
      complete: () => {
        this.getTasks()
      }
    })
    this.closeAssignTask()
  }
}
