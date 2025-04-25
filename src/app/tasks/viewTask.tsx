import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DialogWrapper from "@/lib/helper/Dialog";
import { Task } from "./page";
import {cn} from '@/lib/utils';

type TaskDialogContentProps = {
  task: Task;
  isTaskDialogOpen: boolean;
  setIsTaskDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

const TaskDialogContent: React.FC<TaskDialogContentProps> = ({
  task,
  isTaskDialogOpen,
  setIsTaskDialogOpen,
  setSelectedTask,
}) => {
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
        <Button variant="default" onClick={() => setIsTaskDialogOpen(false)}>
          Close
        </Button>
      }
    >
      <div className="flex-col space-y-4">
        <div className="font-bold text-lg">
          <Label className="font-medium">Task Title:</Label>{" "}
          <h2 className="inline">{task.title}</h2>
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="font-medium">Task Description</Label>
          <Textarea
            className="border px-2 py-1 w-full rounded opacity-50"
            value={task.content}
            readOnly
            placeholder="Task description"
          />
        </div>
        <div>
          <Label className="font-medium">Assignee:</Label>{" "}
          <h3 className="inline font-bold">{task.name}</h3>
        </div>
        <div>
          <Label className="font-medium">Priority:</Label>{" "}
          <h3 className="inline">
            <span className={priorityClass(task.priority)}>
              {task.priority}
            </span>
          </h3>
        </div>
        <div>
          <Label className="font-medium">Status:</Label>{" "}
          <h3 className="inline">
            <span className={statusClass(task.status)}>
              {task.status}
            </span>
          </h3>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default TaskDialogContent;
