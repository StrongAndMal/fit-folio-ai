
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Props = {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
};

const SettingsSection: React.FC<Props> = ({ icon, title, children, className }) => (
  <Card className={`rounded-2xl border-0 shadow-none bg-gradient-to-br from-white via-fit-purple/10 to-fit-purple/5 dark:from-fit-purple/60 dark:to-card/80 ${className || ""}`}>
    <CardHeader className="flex flex-row items-center gap-2 bg-transparent p-4 pb-2">
      {icon && <div className="text-primary">{icon}</div>}
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">{children}</CardContent>
  </Card>
);

export default SettingsSection;
