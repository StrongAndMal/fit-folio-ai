
import React from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressEntryDetail = () => {
  const { entryId } = useParams();

  // Placeholder data for now
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Entry {entryId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Photo and progress stats here.</div>
      </CardContent>
    </Card>
  );
};

export default ProgressEntryDetail;
