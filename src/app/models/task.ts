import { ICheckItem } from "./check-item"
import { IStatus } from "./status"
import { IUser } from "./user"

export interface ITask {
    id: number,
    title: string,
    fromPerson: IUser,
    forPerson: IUser,
    assignDate: string,
    deadLine: string,
    details: string,
    status: IStatus,
    checkList: ICheckItem[],
    progress: number | string
}