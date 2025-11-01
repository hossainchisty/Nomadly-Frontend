import { cn } from "@/lib/utils";

interface NomadlyScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const NomadlyScoreBadge = ({ score, size = "md", showLabel = true }: NomadlyScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-green-600";
    if (score >= 75) return "from-blue-500 to-cyan-600";
    if (score >= 60) return "from-yellow-500 to-orange-600";
    return "from-orange-500 to-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Exceptional";
    if (score >= 75) return "Excellent";
    if (score >= 60) return "Good";
    return "Fair";
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full shadow-medium",
          sizeClasses[size]
        )}
      >
        {/* Gradient Background */}
        <div className={cn("absolute inset-0 rounded-full bg-gradient-to-br", getScoreColor(score))} />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white">
          <span className="font-bold leading-none">{score}</span>
          {size !== "sm" && <span className="text-[0.6em] opacity-90 leading-none">Score</span>}
        </div>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-foreground">Nomadly Score</span>
          <span className="text-xs text-muted-foreground">{getScoreLabel(score)}</span>
        </div>
      )}
    </div>
  );
};

export default NomadlyScoreBadge;
