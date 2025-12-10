import PerformanceMetrics from "@/src/components/PerformanceMetrics";
import React from "react";

const TonePersonality = () => {
  return (
    <div>
      <div className="bg-[#FFFFFF] rounded-2xl p-6">
        <div className="mb-6">
          <p className="font-inter text-[#0A0A0A]">Personality Sliders</p>
          <p className="font-inter text-[#717182] mt-2">
            Adjust how JamieGPT communicates with your leads
          </p>
        </div>

        <div className="space-y-8">
          <PerformanceMetrics
            title="Empathy"
            text={`Higher empathy = more understanding and supportive language`}
            percent={100}
          />

          <PerformanceMetrics
            title="Directness"
            text={`Higher directness = more straightforward, less small talk`}
            percent={90}
          />

          <PerformanceMetrics
            title="Humor"
            text={`Higher humor = more playful and lighthearted responses`}
            percent={80}
          />

          <PerformanceMetrics
            title="Formality"
            text={`Higher formality = more professional, lower = more casual`}
            percent={70}
          />
        </div>
      </div>
    </div>
  );
};

export default TonePersonality;
