import { IStatus } from "./status"
import { IUser } from "./user"

export interface ITask {
    title: string,
    fromPerson: IUser,
    forPerson: IUser,
    assignDate: string,
    deadLine: string,
    details: string,
    status: IStatus
}