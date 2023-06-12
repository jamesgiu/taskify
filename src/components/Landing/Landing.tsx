import { Alert, Blockquote, Card, Center, Divider, Header, List, Paper, Text, Title } from "@mantine/core";
import {
    IconBackhoe,
    IconBrandGithub,
    IconBulb,
    IconBulldozer,
    IconGlassFull,
    IconInfoCircle,
    IconLogout,
    IconMoodSad,
    IconWreckingBall,
} from "@tabler/icons";
import Quote from "inspirational-quotes";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { taskListsMapAtom, taskNumbersAtom, userInfoAtom } from "../../recoil/Atoms";
import { LOGO } from "../AppShell/components/Header/QuickTickHeader";
import { TaskUtil } from "../MyTasks/components/TaskUtil";
import "./Landing.css";
import Clock from 'react-live-clock';
import { MOTIVATIONAL_IMAGES } from "./images";

export function getRandomInt(min: number, max: number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export default function Landing(): JSX.Element {
    const userInfo = useRecoilValue(userInfoAtom);
    const taskListMap = useRecoilValue(taskListsMapAtom);
    const taskNumbers = useRecoilValue(taskNumbersAtom);
    const [time, setTime] = useState<string>();
    const [bgImage, setBgImage] = useState<string>();

    const [inspirationalQuote, setInspirationalQuote] = useState<{ text: string; author: string }>();

    const getDateStr = () : string => {
        const nowDate = new Date(Date.now());
        const timeString = `${nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours()}:${nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes()}:${nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds()}`;

        return timeString;
    }

    useEffect(() => {
        setTimeout(() => setTime(getDateStr), 1000);
    }, [time]);

    useEffect(() => {
        setBgImage(MOTIVATIONAL_IMAGES[getRandomInt(0, MOTIVATIONAL_IMAGES.length)].url)
        setInspirationalQuote(Quote.getQuote());
    }, []);

    function getCompletedTasksToday(): number {
        const now = new Date(Date.now());
        const nowWeek = TaskUtil.getWeek(now);

        const completedTasksToday = [];
        taskListMap.forEach((tasks) => {
            const completedTasks = tasks.filter((task) => {
                const taskCompletionDate = new Date(task.completed);
                const wasTaskCompletedThisWeek = TaskUtil.getWeek(taskCompletionDate) === nowWeek;
                return wasTaskCompletedThisWeek && now.getDay() === taskCompletionDate.getDay();
            });

            completedTasksToday.push(...completedTasks);
        });

        return completedTasksToday.length;
    }

    const completedTasksToday = getCompletedTasksToday();

    return (
        <div className={"landing"}>
            {userInfo && inspirationalQuote && (
                <div className="landing-wrapper" style={{backgroundImage: `url(${bgImage})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div className="landing-inner">
                    <Alert className={"today-at-a-glance"} icon={<IconBulb size={32} />} title="Today at a glance">
                        So far, you have completed {completedTasksToday} task{completedTasksToday === 1 ? "" : "s"}{" "}
                        today. There's {taskNumbers.dueToday} task{taskNumbers.dueToday === 1 ? "" : "s"} left for
                        today. {taskNumbers.dueTomorrow} task{taskNumbers.dueTomorrow === 1 ? "" : "s"} due for
                        tomorrow. In total, {taskNumbers.dueThisWeek} task{taskNumbers.dueThisWeek === 1 ? "" : "s"}{" "}
                        left this week.
                    </Alert>
                    <Title className={"clock"}>{time}</Title>
                    <Title className={"welcome"} order={3}>G'day, {userInfo.given_name}</Title>                  
                    <div className="quote">
                        <Blockquote cite={inspirationalQuote.author}>{inspirationalQuote.text}</Blockquote>
                    </div>
                    </div>
                </div>
            )}
        </div>
    );
}
