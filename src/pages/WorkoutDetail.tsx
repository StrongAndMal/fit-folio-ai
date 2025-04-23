
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WorkoutDetail = () => {
  const { id } = useParams();
  // You can fetch real data by id later
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workout Details: {id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Workout details and exercises go here.</div>
      </CardContent>
    </Card>
  );
};

export default WorkoutDetail;
