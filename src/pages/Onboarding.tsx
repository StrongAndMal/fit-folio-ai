
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to FitFolio AI!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Let's get started! Please complete your profile & set your fitness goals.
        </p>
        <Button className="mt-4" onClick={() => navigate("/")}>Continue</Button>
      </CardContent>
    </Card>
  );
};

export default Onboarding;
