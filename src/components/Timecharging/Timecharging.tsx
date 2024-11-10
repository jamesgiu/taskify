import { Table } from "@mantine/core";
import { useState } from "react";
import Timer from "./Timer";
import { useRecoilValue } from "recoil";
import { TaskList } from "../../api/Types";
import { taskListsAtom } from "../../recoil/Atoms";

export enum TimerDay {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6,
}

export interface TimerState {
    day: TimerDay,
    listName: String,
    listId: String,
    timeSeconds: number
}

export default function Timecharging(): JSX.Element {
    const taskLists = useRecoilValue<TaskList[]>(taskListsAtom);

    const buildRows = () : JSX.Element[] => {
        let rows : JSX.Element[] = [];

        for(let i=0; i < 7; i++) {
            rows.push(<td>{buildRowFromTaskLists(i)}</td>)
        };

        return rows;
    }

    const buildRowFromTaskLists = (timerDay: TimerDay): JSX.Element[] => {
        const timers : JSX.Element[] = [];
        taskLists.forEach((list) => {
            timers.push(<Timer name={list.title} id={list.id} day={timerDay}/>);
         });

      return timers;
    }


    return <div className={"timecharging"}>
        Timecharging
        <Table>
        <thead>
            <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
            </tr>
        </thead>
        <tbody>{buildRows()}</tbody>
    </Table>
   </div>;
}
