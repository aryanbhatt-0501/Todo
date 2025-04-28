import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DialogWrapper from "@/lib/helper/Dialog";
import DropdownComponent from "@/lib/helper/Dropdown";
import { Task } from "./page";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Teammate } from "../teammates/team";

type TaskDialogContentProps = {
  task: Task;
  isTaskDialogOpen: boolean;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  teammates: Teammate[];
  handleSubmit: (task: Task | null, id: number) => void;
};

const TaskDialogContent: React.FC<TaskDialogContentProps> = ({
  task,
  isTaskDialogOpen,
  setIsTaskDialogOpen,
  setSelectedTask,
  teammates,
  handleSubmit,
}) => {
  const [readOnly, setReadOnly] = useState(true);
  const [editTask, setEditTask] = useState<Task | null>(null);

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

  return (
    <DialogWrapper
      title={`Task #${task.id}`}
      description={""}
      open={isTaskDialogOpen}
      onOpenChange={(open) => {
        setIsTaskDialogOpen(open);
        if (!open) setSelectedTask(null);
      }}
      closeButtons={
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => setIsTaskDialogOpen(false)}
          >
            Close
          </Button>
          {!readOnly && (
            <Button variant={"default"} type="button" onClick={() => handleSubmit(editTask, task.id)}>
              Update
            </Button>
          )}
        </div>
      }
    >
      <div className="flex-col space-y-4">
        {readOnly ? (
          <Button
            variant="outline"
            onClick={() => {
              setReadOnly(false);
              setEditTask(task);
            }}
          >
            Edit
          </Button>
        ) : (
          <Button variant="default">Edit</Button>
        )}
        <div className="font-bold text-lg">
          <Label className="font-medium">Task Title:</Label>{" "}
          {readOnly ? (
            <h2 className="inline">{task.title}</h2>
          ) : (
            <Input
              className="border px-2 py-1 w-full rounded opacity-50"
              value={editTask?.title}
              onChange={(e) => {
                setEditTask(
                  editTask ? { ...editTask, title: e.target.value } : null
                );
              }}
              placeholder="Task title"
              readOnly={readOnly}
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="font-medium">Task Description</Label>
          <Textarea
            className="border px-2 py-1 w-full rounded opacity-50"
            value={readOnly ? task.content : editTask?.content}
            readOnly={readOnly}
            onChange={(e) => {
              setEditTask(
                editTask ? { ...editTask, content: e.target.value } : null
              );
            }}
          />
        </div>
        <div>
          <Label className="font-medium">Assignee:</Label>{" "}
          {readOnly ? (
            <h3 className="inline font-bold">{task.name}</h3>
          ) : (
            <DropdownComponent
              items={teammates.map((teammate) => ({
                // value: teammate.id.toString(),
                value: teammate.name,
                label: teammate.name,
              }))}
              placeholder={task.name}
              onChange={(value) => {
                setEditTask(
                  editTask
                    ? {
                        ...editTask,
                        name: value,
                        email:
                          teammates.find((t) => t.name === value)?.email ?? "",
                      }
                    : null
                );
              }}
            />
          )}
        </div>
        <div>
          <Label className="font-medium">Priority:</Label>{" "}
          {readOnly ? (
            <h3 className="inline">
              <span className={priorityClass(task.priority)}>
                {task.priority}
              </span>
            </h3>
          ) : (
            <DropdownComponent
              items={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
              ]}
              placeholder={task.priority}
              onChange={(value) => {
                setEditTask(editTask ? { ...editTask, priority: value } : null);
              }}
            />
          )}
        </div>
        <div>
          <Label className="font-medium">Status:</Label>{" "}
          {readOnly ? (
            <h3 className="inline">
              <span className={statusClass(task.status)}>{task.status}</span>
            </h3>
          ) : (
            <DropdownComponent
              items={[
                { value: "In progress", label: "In progress" },
                { value: "Completed", label: "Completed" },
                { value: "Todo", label: "Todo" },
              ]}
              placeholder={task.status}
              onChange={(value) => {
                setEditTask(editTask ? { ...editTask, status: value } : null);
              }}
            />
          )}
        </div>
      </div>
    </DialogWrapper>
  );
};

export default TaskDialogContent;
