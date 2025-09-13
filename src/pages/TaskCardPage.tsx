import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Group,
  Checkbox,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState,useEffect } from "react";
import dayjs from "dayjs";
import AddTaskModal from "../components/AddTaskModal";
import { useTaskStore } from "../store/TaskItemStore";
export default function HomePage() {
  const { tasks, addTask, setTasks, toggleTask, removeTask } = useTaskStore();
  const [modalOpened, setModalOpened] = useState(false);
  const [FirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (FirstLoad) {
      setFirstLoad(false);
      const getTasks = localStorage.getItem("tasks");
      if (getTasks !== null) {
        setTasks(JSON.parse(getTasks));
      }
      return;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [FirstLoad, setTasks, tasks]);


  return (
    <Container size="lg" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List Card</Title>
        <Text size="sm" c="dimmed">
          All : {tasks.length} | Done :
          {tasks.filter(t => t.isDone).length}
        </Text>
        {/* Button เรียกใช้งาน Modal*/}
        <Button onClick={() => setModalOpened(true)}>Add Task</Button>
        {/* แสดง Modal */}
        <AddTaskModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
          onAdd={addTask}
        />
        {/* แสดง Task Cards */}
        <Stack w="100%">
          {tasks.map((task) => (
            <Card withBorder shadow="sm" radius="md" mb="sm" key={task.id}>
              <Group justify="space-between" align="flex-start">
                <Stack>
                  {/* เพิ่ม assignees ตรงนี้*/}
                  <Group>
                    {task.assignees.map((assignee) => (
                      <Badge color="blue" variant="light">
                        {assignee}
                      </Badge>
                    ))}
                  </Group>

                  <Text
                    fw={600}
                    td={task.isDone ? "line-through" : "none"}
                    size="lg"
                  >
                    {task.title}
                  </Text>

                  <Text size="sm" c="dimmed">
                    {task.description}
                  </Text>
                  {task.dueDate ? (
                    <Text size="xs" c="gray">
                      Due: {dayjs(task.dueDate).format("ddd MMM DD YYYY")}
                    </Text>
                  ) : (
                    <Text size="xs" c="gray">
                      Due: -
                    </Text>
                  )}
                  {task.doneAt && (
                    <Text size="xs" c="baer">
                      Done at: {dayjs(task.doneAt).format("ddd MMM DD YYYY")}
                    </Text>
                  )}
                </Stack>

                <Group>
                  <Checkbox
                    checked={task.isDone}
                    onChange={() => toggleTask(task.id)}
                    label="Done"
                  />
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => removeTask(task.id)}
                    title="Delete task"
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
