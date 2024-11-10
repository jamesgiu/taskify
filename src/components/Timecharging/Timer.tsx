import { Card, Chip, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { TimerDay, TimerState } from "./Timecharging";
import { timerAtom } from "../../recoil/Atoms";
import { useRecoilState, useRecoilValue } from "recoil";


interface TimerProps {
    name: String,
    id: String,
    day: TimerDay,
}

export default function Timer(props: TimerProps): JSX.Element {
    const [timers, setTimers] = useRecoilState<Map<string, number>>(timerAtom);

    const getTimeForTimer = (): number => {
        if (timers.has(`${props.id}${props.day}`)) {
            return timers.get(`${props.id}${props.day}`) as number;
        }

        return 0;
    }

    // Store this in atom with key being name
    const [timeSecondsState, setTimeSecondsState] = useState<number>(0);
    const [isCounting, setIsCounting] = useState<boolean>(false);

    const handleOnChange = () => {
        setIsCounting(!isCounting);
    }

    useEffect(() => {
         setTimeSecondsState(getTimeForTimer());
    }, [])

    useEffect(() => {
        if (isCounting) {
            setTimeout(()=> {
                setTimeSecondsState(timeSecondsState + 1)
                const newTimers = timers;
                newTimers.set(`${props.id}${props.day}`, timeSecondsState + 1)
                setTimers(newTimers);
            }, 1000)
        }
    }, [isCounting, timeSecondsState])

    return (
        <Chip checked={isCounting} onChange={handleOnChange}>{props.name} : {new Date(timeSecondsState * 1000).toISOString().slice(11, 19)}</Chip>
      );
}
