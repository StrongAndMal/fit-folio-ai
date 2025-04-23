
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const progressEntries = [
  { id: "101", date: "2024-04-21" },
  { id: "102", date: "2024-04-22" },
];

const Progress = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Progress Journal</h2>
      <Link to="/progress/new" className="fitness-btn">+ New Entry</Link>
    </div>
    <div className="grid gap-4">
      {progressEntries.map((entry) => (
        <Link to={`/progress/${entry.id}`} key={entry.id}>
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Entry: {entry.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Photo, notes, and stats preview</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Progress;
