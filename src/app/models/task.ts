import { ICheckItem } from "./check-item"
import { IStatus } from "./status"
import { IUser } from "./user"

export interface ITask {
    id: number,
    title: string,
    fromUsername: string,
    fromGuid: string,
    forUsername: string,
    forGuid: string,
    assignDate: string,
    deadLine: string,
    details: string,
    status: IStatus,
    checkList: ICheckItem[],
    progress: number | string
}