import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Team from "./team";
import AddTeamMate from "./addTeamMate";

export default function Teammates() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full w-full p-4">
      <div className="flex flex-col items-center justify-center w-full gap-4 h-1/5 p-4 bg-gray-100">
        <h1>Manage your team</h1>
      </div>
      <div className="flex flex-col items-center gap-4 h-full w-full p-4">
        <Tabs defaultValue="teammates" className="w-full">
          <TabsList>
            <TabsTrigger value="teammates">My Team</TabsTrigger>
            <TabsTrigger value="addTeamMate">
              Add a new member to my team
            </TabsTrigger>
          </TabsList>
          <TabsContent value="teammates">
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
