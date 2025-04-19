"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Teammate = {
  id: number;
  name: string;
  email: string;
  designation: string;
};

export default function Team() {
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [updatedTeammate, setUpdatedTeammate] = useState<Teammate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchTeammates();
  }, []);

  console.log("teammates", teammates);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/teammates/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTeammates(teammates.filter((teammate) => teammate.id !== id));
    } catch (error) {
      console.error("Error deleting teammate:", error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      if (!updatedTeammate) return;
      const response = await fetch(`/api/teammates/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: updatedTeammate.email,
          designation: updatedTeammate.designation,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTeammates((prev) =>
        prev.map((teammate) =>
          teammate.id === id ? { ...teammate, ...updatedTeammate } : teammate
        )
      );
      setUpdatedTeammate(null);
    } catch (error) {
      console.error("Error updating teammate:", error);
    }
  };

  const onEmailChange = (newEmail: string) => {
    setUpdatedTeammate((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        email: newEmail,
      };
    });
  };

  const onDesignationChange = (newDesignation: string) => {
    setUpdatedTeammate((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        designation: newDesignation,
      };
    });
  };

  return (
    <Dialog>
      <Table>
        <TableCaption>Team Manchester United</TableCaption>
        <TableHeader className="border-b w-full">
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Designation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teammates.map((teammate) => (
            <TableRow key={teammate.id}>
              <TableCell>{teammate.name}</TableCell>
              <TableCell>{teammate.email}</TableCell>
              <TableCell className="flex gap-2">
                <MdDelete
                  onClick={() => handleDelete(teammate.id)}
                  className="w-5 h-5 cursor-pointer"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <MdEdit
                      onClick={() => setUpdatedTeammate(teammate)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Teammate</DialogTitle>
                      <DialogDescription>
                        Here you can update {teammate.name}'s email or
                        designation.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <input
                        defaultValue={teammate.email}
                        className="border px-2 py-1 w-full rounded"
                        onChange={(e) => onEmailChange(e.target.value)}
                      />
                      <input
                        defaultValue={teammate.designation}
                        className="border px-2 py-1 w-full rounded"
                        onChange={(e) => onDesignationChange(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button onClick={() => handleEdit(teammate.id)}>
                          Save Changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{teammate.designation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Dialog>
  );
}
