import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICheckItem } from 'src/app/models/check-item';
import { IMessage } from 'src/app/models/message';
import { ITask } from 'src/app/models/task';
import { MessagesService } from 'src/app/services/messages.service';
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
  checkedItems: ICheckItem[] = [] 
  formGroup: FormGroup = new FormGroup({
    date: new FormControl<Date | null>(null)
  });
  addItemCheckListForm: FormGroup = new FormGroup({
    text: new FormControl(null, [Validators.required, Validators.minLength(1)])
  })
  taskMessages: IMessage[] = []

  firstButtons: boolean = false
  secondButtons: boolean = false
  addItemCheckList: boolean = false
  editItemsCheckList: boolean = false
  visibleSubmitTask: boolean = false
  visibleMessageOwner: boolean = false

  constructor(private router: Router, private tasksService: TasksService,
    private messageService: MessagesService) {
    this.idTask = +this.router.url.split('/')[2]
    this.getTask(this.idTask)
  }

  ngOnInit(): void {
    
  }

  getTask(id: number) {
    this.tasksService.getTaskById(id).subscribe({
      next: (res) => {
        this.task = res
        this.checkedItems = this.task.checkList?.filter(t => t.checked === true)
        if(this.task.status.id === 4) {
          this.firstButtons = true
          this.secondButtons = false
        }
        else if(this.task.status.id === 1) {
          this.firstButtons = false
          this.secondButtons = true
        }
        else {
          this.firstButtons = false
          this.secondButtons = false
        }
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

  checkItem(value: ICheckItem[]) {
    this.task.checkList.map(t => t.checked = false)
    this.task.checkList.map(t => 
      {
        if(value.map((v: ICheckItem) => v.id).includes(t.id))
        {
          t.checked = true
        }
      }
    )
    this.task.progress = (value.length * 100 / this.task.checkList.length).toFixed(2)
    this.tasksService.editTask(this.task.id, this.task).subscribe()
  }

  saveAddItemCheckList() {
    let newItem: ICheckItem = {} as ICheckItem
    newItem.id = this.task.checkList.length + 1
    newItem.checked = false
    newItem.text = this.addItemCheckListForm.get('text')?.value
    this.task.checkList.push(newItem)
    this.task.progress = (this.checkedItems.length * 100 / this.task.checkList.length).toFixed(2)
    this.tasksService.editTask(this.task.id, this.task).subscribe({
      complete: () => {
        this.closeAddItemCheckList()
      }
    })
  }

  closeAddItemCheckList() {
    this.addItemCheckList = false
    this.addItemCheckListForm.reset()
  }

  saveEditItemsCheckList() {
    this.tasksService.editTask(this.task.id, this.task).subscribe({
      complete: () => {
        this.closeEditItemsCheckList()
      }
    })
  }

  deleteItemCheckList(id: number) {
    for(let i = 0; i < this.task.checkList.length; i++) {
      if(this.task.checkList[i].id === id)
        {         
          for(let j = i; j < this.task.checkList.length - 1; j++)
          {
            this.task.checkList[j].id = this.task.checkList[j].id
            this.task.checkList[j].checked = this.task.checkList[j+1].checked
            this.task.checkList[j].text= this.task.checkList[j+1].text
          }
          this.task.checkList.pop()
          this.checkedItems = this.task.checkList?.filter(t => t.checked === true)
          this.task.progress = (this.checkedItems.length * 100 / this.task.checkList.length).toFixed(2)
          return
        }
    }
  }

  dontSaveEditItemsCheckList(){
    this.getTask(this.idTask)
    this.closeEditItemsCheckList()
  }

  closeEditItemsCheckList() {
    this.editItemsCheckList = false
  }

  submitTask() {
    this.visibleSubmitTask = true
  }

  submitSubmitTask() {
    const today = new Date().toISOString().slice(0, 10)
    console.log(today);
    console.log(this.task.deadLine);
    
    
    if(this.task.deadLine < today) {
      this.task.status = {
        id: 3,
        message: 'late'
      }
    }
    else {
      this.task.status = {
        id: 2,
        message: 'finished'
      }
    }
    this.tasksService.editTask(this.task.id, this.task).subscribe({
      complete: () => {
        this.visibleSubmitTask = false
        this.getTask(this.task.id)
      }
    })
    this.closeSubmitTask()
  }

  closeSubmitTask() {
    this.visibleSubmitTask = false
  }

  messageOwner() {
    this.messageService.getMessagesTask().subscribe({
      next: (res) => {
        this.taskMessages = res.filter(m => m.idTask === this.idTask).sort(this.compareFn)
      },
      complete: () => {
        this.visibleMessageOwner = true
      }
    })
  }

  compareFn(a: IMessage, b: IMessage) {
    if(a.id < b.id) return -1
    else if(a.id > b.id) return 1
    return 0
  }

  closeMessageOwner(value: boolean) {
    this.visibleMessageOwner = value
  }

  sendMessage(value: string) {
    let newMessage: IMessage = {
      idTask: this.idTask,
      content: value,
      user: this.task.forUsername,
      date: new Date().toISOString().slice(0, 10)
    } as IMessage
    this.messageService.addMessage(newMessage).subscribe({
      complete: () => {
        this.taskMessages.push(newMessage)
      }
    })
  }

  acceptTask() {
    this.task.accepted = 1
    this.task.status = {
      id: 1,
      message: 'progress'
    }
    this.tasksService.editTask(this.task.id, this.task).subscribe({
      complete: () => {
        this.getTask(this.task.id)
      }
    })
  }

  declineTask() {
    this.task.accepted = 0
    this.task.status = {
      id: 5,
      message: 'declined'
    }
    this.tasksService.editTask(this.task.id, this.task).subscribe({
      complete: () => {
        this.getTask(this.task.id)
      }
    })
  }
}
