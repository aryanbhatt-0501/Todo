// src/app/dashboard/page.tsx
import React from "react";
import { FaHome } from "react-icons/fa";
import TaskList from "@/app/dashboard/taskList";
import AssignedTaskList from "@/app/dashboard/assignedTaskList";

export default function DashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full mx-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center items-center w-full h-1/4 gap-2 bg-red-100">
        <FaHome />
        <h1>Hi Username, get started right away.</h1>
      </div>
      <div className="flex gap-2 w-full h-3/4 mt-2 items-center">
        <TaskList />
        <AssignedTaskList />
      </div>
    </div>
  );
}
