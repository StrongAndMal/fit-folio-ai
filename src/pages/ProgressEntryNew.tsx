
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgressEntryNew = () => {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic goes here
    navigate("/progress");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Progress Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          {/* Replace with actual upload and fields */}
          <div>
            <label className="block font-medium">Photo Upload</label>
            <input type="file" className="w-full" required />
          </div>
          <div>
            <label className="block font-medium">Notes</label>
            <textarea className="w-full border rounded" />
          </div>
          <Button type="submit" className="w-full">Save Entry</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProgressEntryNew;
