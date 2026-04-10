import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Trends from "@/components/Trends";

const TrendsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 pt-28">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </div>

      <Trends />
    </div>
  );
};

export default TrendsPage;
