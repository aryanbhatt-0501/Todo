"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/lib/helper/Dialog";
import DropdownWrapper from "@/lib/helper/Dropdown";
import { Teammate } from "@/app/teammates/team";

export type Task = {
  id: number;
  content: string;
  email: string;
  title: string;
  name: string;
  priority: string;
  status: string;
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createTaskForm, setCreateTaskForm] = useState({
    title: "",
    content: "",
    priority: "",
    status: "",
    assigneeid: "",
  });
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  // const [updatedTask, setUpdatedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchTeammates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/teammates");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTeammates(data);
      } catch (error) {
        console.error("Error fetching teammates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
    fetchTeammates();
  }, []);

  const statusOptions = useMemo(() => {
    return [
      { value: "Todo", label: "Todo" },
      { value: "In progress", label: "In progress" },
      { value: "Completed", label: "Completed" },
    ];
  }, []);

  const priorityOptions = useMemo(() => {
    return [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ];
  }, []);

  const inputFields = useMemo(() => {
    return ["Task title", "Task description", "Priority", "Status", "Assignee"];
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const result = await fetch("api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createTaskForm),
      });
      if (!result.ok) {
        console.error("Error creating task:", result.statusText);
        return;
      }
      const newTask = await result.json();
      setTasks((prev) => [
        ...prev,
        {
          ...newTask,
          name: teammates.find((teammate) => teammate.id === newTask.assigneeid)?.name,
        },
      ]);      
      setCreateTaskForm({
        title: "",
        content: "",
        priority: "",
        status: "",
        assigneeid: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    !loading && (
      <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
        <div className="flex items-center justify-between w-[80%] p-2">
          <h1>Tasks</h1>
          <DialogWrapper
            title="Create a new task"
            description="Briefly describe the task and assign it to a teammate."
            trigger={
              <Button className="bg-blue-500 text-white hover:bg-blue-700">
                Add Task
              </Button>
            }
            closeButtons={
              <Button
                variant="default"
                onClick={handleSubmit}
              >
                Create
              </Button>
            }
            onOpenChange={() => {}}
          >
            <div className="space-y-4">
              {inputFields.map((field, index) => (
                <span key={index} className="flex flex-col space-y-2 mb-4">
                  <Label className="font-medium">{field}</Label>
                  {field === "Assignee" && (
                    <DropdownWrapper
                      items={teammates.map((t) => ({
                        label: t.name,
                        value: String(t.id),
                      }))}
                      onChange={(value) =>
                        setCreateTaskForm({
                          ...createTaskForm,
                          assigneeid: value,
                        })
                      }
                      placeholder="Assign to teammate"
                    />
                  )}
                  {field === "Priority" && (
                    <DropdownWrapper
                      items={priorityOptions}
                      onChange={(value) =>
                        setCreateTaskForm({
                          ...createTaskForm,
                          priority: value,
                        })
                      }
                      placeholder="Select priority"
                    />
                  )}
                  {field === "Status" && (
                    <DropdownWrapper
                      items={statusOptions}
                      onChange={(value) =>
                        setCreateTaskForm({ ...createTaskForm, status: value })
                      }
                      placeholder="Select status"
                    />
                  )}
                  {field !== "Assignee" &&
                    field !== "Priority" &&
                    field !== "Status" && (
                      <Textarea
                        className="border px-2 py-1 w-full rounded"
                        onChange={(e) =>
                          setCreateTaskForm({
                            ...createTaskForm,
                            [field.toLowerCase().replace(" ", "") ===
                            "tasktitle"
                              ? "title"
                              : field.toLowerCase().replace(" ", "") ===
                                "taskdescription"
                              ? "content"
                              : field.toLowerCase().replace(" ", "")]:
                              e.target.value,
                          })
                        }
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                    )}
                </span>
              ))}
            </div>
          </DialogWrapper>
        </div>
        <div className="w-[80%]">
          <Table>
            <TableCaption>Task list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[300px]">Task</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>{task.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  );
}
