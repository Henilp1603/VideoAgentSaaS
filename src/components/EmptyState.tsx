import Image from "next/image";
import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image src={"./Empty.svg"} alt="empty" width={240} height={240} />
      <div className="flex flex-col gap-y-2 max-w-md mx-auto text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
