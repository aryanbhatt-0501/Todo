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
import { MdDelete } from "react-icons/md";

export default function Team() {
  return (
    <Table>
      <TableCaption>Team Manchester United</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
          <TableHead className="">Designation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Aryan</TableCell>
          <TableCell>aryanbhatt0501@gmail.com</TableCell>
          <TableCell><MdDelete style={{height: '20px', width: '20px'}} /></TableCell>
          <TableCell className="">Lead Frontend</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
