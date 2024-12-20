import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import React from "react";

interface GaugeProps {
  color: "green" | "blue" | "pink";
  percentage: number;
  label: string;
}

export function Gauge({ color, percentage, label }: GaugeProps) {
  //percentage is between 0 and 100, max number of bars is 10
  const nbBars = Math.floor(percentage / 10);
  const bars: React.ReactNode[] = [];
  for (let i = 0; i < nbBars; i++) {
    switch (color) {
      case "green":
        bars.push(<div className={`h-4 flex-1 bg-green`}></div>);
        break;
      case "blue":
        bars.push(<div className={`h-4 flex-1 bg-blue`}></div>);
        break;
      default:
        bars.push(<div className={`h-4 flex-1 bg-pink`}></div>);
        break;
    }
  }

  for (let k = 0; k < 10 - nbBars; k++) {
    bars.push(<div className="h-4 flex-1 bg-transparent"></div>);
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="pixel-border border-red w-fit">
            <div className="flex flex-row w-[100px] gap-[2px] justify-start p-1">
              {bars.map((bar) => bar)}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-pressstart text-xs">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
