import DialogWrapper from "@/lib/helper/Dialog";
import DropdownWrapper from "@/lib/helper/Dropdown";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";

interface CreateTaskDialogProps {
  inputFields: string[];
  teammates: { id: number; name: string }[];
  priorityOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  createTaskForm: {
    title: string;
    description: string;
    assigneeid: string;
    priority: string;
    status: string;
  };
  setCreateTaskForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      assigneeid: string;
      priority: string;
      status: string;
    }>
  >;
  handleSubmit: () => void;
}

const createTaskDialog: React.FC<CreateTaskDialogProps> = ({
  inputFields,
  teammates,
  priorityOptions,
  statusOptions,
  createTaskForm,
  setCreateTaskForm,
  handleSubmit,
}) => {
  return (
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
                      [field.toLowerCase().replace(" ", "") === "tasktitle"
                        ? "title"
                        : field.toLowerCase().replace(" ", "") ===
                          "taskdescription"
                        ? "description"
                        : field.toLowerCase().replace(" ", "")]: e.target.value,
                    })
                  }
                  placeholder={`Enter ${field.toLowerCase()}`}
                />
              )}
          </span>
        ))}
      </div>
    </DialogWrapper>
  );
};

export default createTaskDialog;
