import { Component } from '@angular/core';
import { ITask } from 'src/app/models/task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  tasks: ITask[] = [
    {
      title: "task 1",
      fromPerson: {
        id: "user1",
        guid: "sdfgsdg",
        username: "user1",
        password: "user1",

      },
      forPerson: {
        id: "user2",
        guid: "khfsiurh",
        username: "user2",
        password: "user2"
      },
      assignDate: "15-09-2023",
      deadLine: "18-09-2023",
      details: "These are details. you should finish the task till deadline.",
      status: {
        id: 2,
        message: "progress"
      }
    },
    {
      title: "task 1",
      fromPerson: {
        id: "user1",
        guid: "sdfgsdg",
        username: "user1",
        password: "user1",

      },
      forPerson: {
        id: "user2",
        guid: "khfsiurh",
        username: "user2",
        password: "user2"
      },
      assignDate: "15-09-2023",
      deadLine: "18-09-2023",
      details: "These are details. you should finish the task till deadline.",
      status: {
        id: 1,
        message: "finished"
      }
    },
    {
      title: "task 1",
      fromPerson: {
        id: "user1",
        guid: "sdfgsdg",
        username: "user1",
        password: "user1",

      },
      forPerson: {
        id: "user2",
        guid: "khfsiurh",
        username: "user2",
        password: "user2"
      },
      assignDate: "15-09-2023",
      deadLine: "18-09-2023",
      details: "These are details. you should finish the task till deadline.",
      status: {
        id: 3,
        message: "late"
      }
    },
    {
      title: "task 1",
      fromPerson: {
        id: "user1",
        guid: "sdfgsdg",
        username: "user1",
        password: "user1",

      },
      forPerson: {
        id: "user2",
        guid: "khfsiurh",
        username: "user2",
        password: "user2"
      },
      assignDate: "15-09-2023",
      deadLine: "18-09-2023",
      details: "These are details. you should finish the task till deadline.",
      status: {
        id: 2,
        message: "progress"
      }
    }
  ]

  getColorStatus(task: ITask) {
    if(task.status.id === 1)
      return 'finished'
    else if(task.status.id === 2)
      return 'progress'
    else if(task.status.id === 3 )
      return 'late'
    return 'nothing'
  }
}
