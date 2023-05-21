import { Accordion, Button, Collapse, MediaQuery, Menu, Navbar, Stack } from "@mantine/core";
import {
    IconAlarm,
    IconArrowBadgeLeft,
    IconArrowBadgeRight,
    IconCalendar,
    IconCheckupList,
    IconClock,
    IconExternalLink,
    IconPlaylistAdd,
    IconTimeline,
    IconTrafficCone,
    IconUrgent,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navbarCollapsedAtom } from "../../../../recoil/Atoms";
import { QuickTickPage } from "../../../../util/QuickTickPage";
import { TaskListFilter } from "../../../MyTasks/components/TaskListCard";
import NewTaskList from "../../../Tasks/NewTasklist/NewTasklist";
import TaskForm from "../../../Tasks/TaskForm/TaskForm";
import QuickTickAuth from "../Auth/QuickTickAuth";
import "./QuickTickNavbar.css";
import Divider = Menu.Divider;

export const getNavbarLinks = (mobile: boolean, onClickCallback?: () => void): JSX.Element => {
    return (
        <Stack className={"navbar-link-stack"} align={"stretch"}>
            <Accordion className="nav-accordion" value={"my-tasks-filters"} chevron={null}>
                <Accordion.Item value="my-tasks-filters">
                    <Accordion.Control>
                        <Link to={QuickTickPage.MY_TASKS} onClick={onClickCallback}>
                            <Button leftIcon={<IconCheckupList />} variant="subtle" size={mobile ? "xl" : "sm"}>
                                My tasks
                            </Button>
                        </Link>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Link to={QuickTickPage.MY_TASKS + `?when=${TaskListFilter.TODAY}`} onClick={onClickCallback}>
                            <Button
                                leftIcon={<IconUrgent color="orange" />}
                                variant="subtle"
                                size={mobile ? "xl" : "sm"}
                            >
                                Today
                            </Button>
                        </Link>
                        <Link to={QuickTickPage.MY_TASKS + `?when=${TaskListFilter.WEEKLY}`} onClick={onClickCallback}>
                            <Button
                                leftIcon={<IconAlarm color="#f5ff70c1" />}
                                variant="subtle"
                                size={mobile ? "xl" : "sm"}
                            >
                                This week
                            </Button>
                        </Link>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Accordion className="nav-accordion" value="create-new" chevron={null}>
                <Accordion.Item value="create-new">
                    <Accordion.Control>
                        <Button leftIcon={<IconPlaylistAdd />} variant="subtle" size={mobile ? "xl" : "sm"}>
                            New
                        </Button>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <TaskForm />
                        <NewTaskList />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Button
                leftIcon={<IconCalendar />}
                variant="subtle"
                size={mobile ? "xl" : "sm"}
                onClick={(): void => {
                    window.open(
                        "https://calendar.google.com/calendar/",
                        "_blank",
                        "popup=true, width=1200, height=1200"
                    );
                }}
            >
                Calendar <IconExternalLink size={16} />
            </Button>
            <Link to={QuickTickPage.STATS} onClick={onClickCallback}>
                <Button leftIcon={<IconTimeline />} variant="subtle" size={mobile ? "xl" : "sm"}>
                    Stats
                </Button>
            </Link>
            <QuickTickAuth />
        </Stack>
    );
};

export default function QuickTickNavbar(): JSX.Element {
    const [collapsed, setCollapsed] = useRecoilState(navbarCollapsedAtom);

    return (
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <div>
                <Button
                    variant="subtle"
                    size="sm"
                    leftIcon={collapsed ? <IconArrowBadgeRight /> : <IconArrowBadgeLeft />}
                    onClick={(): void => setCollapsed(!collapsed)}
                    className={!collapsed ? "collapse-button" : "expand-button"}
                />
                <Collapse in={!collapsed}>
                    <Navbar width={{ sm: !collapsed ? 250 : 0 }} p="xs">
                        <Navbar.Section>{getNavbarLinks(false)}</Navbar.Section>
                    </Navbar>
                </Collapse>
            </div>
        </MediaQuery>
    );
}
