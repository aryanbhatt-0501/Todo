import React from "react";
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

export default function Tasks() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
      <div>
        <h1>Tasks</h1>
      </div>
      <div>
        <Table>
          <TableCaption>Task list</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-[100px]">Task</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="">Designation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">Task title</TableCell>
              <TableCell>aryanbhatt0501@gmail.com</TableCell>
              <TableCell>
                {/* <MdDelete style={{ height: "20px", width: "20px" }} /> */}
              </TableCell>
              <TableCell className="">Lead Frontend</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
