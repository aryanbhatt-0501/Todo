"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { User } from "@supabase/supabase-js";
import Team from "./team";
import AddTeamMate from "./addTeamMate";
import { createClient } from "@/utils/supabase/client";
import type Role from "@/app/interface/role";

export default function Teammates() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>();
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const fetchUserMetaData = async () => {
      supabase.auth.getUser().then(({ data }) => setUser(data.user));
    };
    fetchUserMetaData();
  }, []);

  useEffect(() => {
    const fetchUserRole = async (id: string) => {
      try {
        const response = await fetch(`/api/profile/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user role");
        }
        const data: Role = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (user && user.id) {
      console.log("ID in route:", user.id);
      fetchUserRole(user.id);
    }
  }, [user?.id]);

  console.log("User logged in:", user);
  console.log("User role in Teammates:", role);

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
      <div className="flex flex-col items-center justify-center w-full gap-4 h-1/5 p-4 bg-gray-100">
        <h1>Manage your team</h1>
      </div>
      <div className="flex flex-col items-center gap-4 h-full w-full p-4">
        <Tabs defaultValue="createTeam" className="w-full">
          <TabsList>
            <TabsTrigger value="createTeam">Create a new time</TabsTrigger>
            <TabsTrigger value="addTeamMate">
              Add members to your team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="createTeam">
            <Team />
          </TabsContent>
          <TabsContent value="addTeamMate">
            <AddTeamMate />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
