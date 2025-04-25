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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/lib/helper/Dialog";
import DropdownWrapper from "@/lib/helper/Dropdown";
import { Teammate } from "@/app/teammates/team";
import { cn } from "@/lib/utils";
import ViewTask from './viewTask';

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [sortKey, setSortKey] = useState<
    "title" | "priority" | "status" | "name"
  >("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
          name: teammates.find((teammate) => teammate.id === newTask.assigneeid)
            ?.name,
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

  const priorityClass = (priority: string) => {
    return cn(
      "px-2 py-1 rounded-md font-bold text-white",
      priority === "Low" && "bg-green-500",
      priority === "Medium" && "bg-yellow-500",
      priority === "High" && "bg-red-500"
    );
  };

  const statusClass = (status: string) => {
    return cn(
      "px-2 py-1 rounded-md font-bold text-white",
      status === "In progress" && "bg-yellow-500",
      status === "Completed" && "bg-green-500",
      status === "Todo" && "bg-red-500"
    );
  };

  const filteredAndSortedTasks = useMemo(() => {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    const statusOrder = {
      Todo: 3,
      "In progress": 2,
      Completed: 1,
    };

    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(filterText.toLowerCase()) ||
        task.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const sorted = [...filtered];

    if (sortKey === "priority") {
      sorted.sort((a, b) => {
        const aPriority =
          priorityOrder[a.priority as keyof typeof priorityOrder] ?? 0;
        const bPriority =
          priorityOrder[b.priority as keyof typeof priorityOrder] ?? 0;
        return sortDirection === "asc"
          ? aPriority - bPriority
          : bPriority - aPriority;
      });
    } else if (sortKey === "status") {
      sorted.sort((a, b) => {
        const aStatus = statusOrder[a.status as keyof typeof statusOrder] ?? 0;
        const bStatus = statusOrder[b.status as keyof typeof statusOrder] ?? 0;
        return sortDirection === "asc" ? aStatus - bStatus : bStatus - aStatus;
      });
    } else {
      sorted.sort((a, b) => {
        const aVal = a[sortKey]?.toString().toLowerCase() ?? "";
        const bVal = b[sortKey]?.toString().toLowerCase() ?? "";

        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [tasks, filterText, sortKey, sortDirection]);

  return (
    !loading && (
      <div className="flex flex-col bg-gray-100 items-center justify-center gap-4 h-full w-full p-4">
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
              <Button variant="default" onClick={handleSubmit}>
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
        <div className="flex w-[80%] justify-between items-center">
          <Input
            placeholder="Search tasks..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="bg-gray-100 w-[40%]"
          />
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-bold">Sort by:</h2>
            <Select
              value={sortKey}
              onValueChange={(val: "title" | "priority" | "status" | "name") => setSortKey(val)}
            >
              <SelectTrigger className="w-[160px] bg-gray-100">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="name">Assignee</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() =>
                setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
              }
              className="bg-gray-100"
            >
              {sortDirection === "asc" ? (
                <FaSortAmountUp />
              ) : (
                <FaSortAmountDown />
              )}
            </Button>
          </div>
        </div>
        <div className="w-[80%] min-h-[600px] overflow-auto">
          {isTaskDialogOpen && selectedTask && <ViewTask task={selectedTask} isTaskDialogOpen={isTaskDialogOpen} setIsTaskDialogOpen={setIsTaskDialogOpen} setSelectedTask={setSelectedTask} />}
          <Table>
            <TableCaption>Task list</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 font-bold"></TableHead>
                <TableHead className="w-[300px] font-bold">Task</TableHead>
                <TableHead className="font-bold">Assignee</TableHead>
                <TableHead className="font-bold">Priority</TableHead>
                <TableHead className="font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    <Checkbox />
                  </TableCell>
                  <TableCell
                    className="font-medium cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsTaskDialogOpen(true);
                    }}
                  >
                    {task.title}
                  </TableCell>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <span className={priorityClass(task.priority)}>
                      {task.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={statusClass(task.status)}>
                      {task.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  );
}
