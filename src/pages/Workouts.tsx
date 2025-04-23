
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const demoWorkouts = [
  { id: "1", name: "Full Body Alpha" },
  { id: "2", name: "Push-Pull Power" },
];

const Workouts = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Workouts & Programs</h2>
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {demoWorkouts.map((w) => (
        <Link to={`/workouts/${w.id}`} key={w.id}>
          <Card className="hover-scale mb-2">
            <CardHeader>
              <CardTitle>{w.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <span>Tap to view details</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

export default Workouts;
