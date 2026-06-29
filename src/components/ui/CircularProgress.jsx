import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useTheme } from '@/context/ThemeContext';

ChartJS.register(ArcElement, Tooltip);

// Read a theme token from the live CSS variables so the chart follows
// light/dark automatically (theme dependency keeps this in sync on toggle).
const cssVar = (name) =>
  `hsl(${getComputedStyle(document.documentElement).getPropertyValue(name).trim()})`;

const CircularProgress = ({ total, accepted, pending, rejected, content }) => {
  const { theme } = useTheme();
  const isZero = total === 0;

  // Map status colors to theme tokens
  const currentColors = {
    empty: cssVar('--muted'),
    accepted: cssVar('--primary'),
    pending: cssVar('--warning'),
    rejected: cssVar('--destructive'),
  };

  const data = {
    datasets: [
      {
        data: isZero ? [1] : [accepted, pending, rejected],
        backgroundColor: isZero
          ? [currentColors.empty]
          : [currentColors.accepted, currentColors.pending, currentColors.rejected],
        borderWidth: 0,
        hoverOffset: 4,
        cutout: "85%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    events: [],
  };

  return (
    <div className="relative w-32 h-32 sm:w-56 sm:h-56">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl sm:text-3xl font-bold text-foreground">{total}</span>
        <div className="text-sm sm:text-md text-muted-foreground max-w-[80%] break-words whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
