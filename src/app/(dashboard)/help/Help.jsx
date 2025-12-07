import Bredcumb from "@/src/components/Bredcumb";
import FAQdropdown from "@/src/components/FAQdropdown";
import React from "react";

const Help = () => {
  return (
    <div>
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2">
          <Bredcumb />
          <span className="font-inter text-[#000000] text-2xl">& Support</span>
        </div>
        <p className="text-[#606060] font-inter mt-2">
          Find answer and get the help you need
        </p>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden mt-12">
        <FAQdropdown
          question={`How does the AI Setter handle conversations?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`Which social media platforms are supported?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`How does CRM integration work?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`What is the expected message volume capacity?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`How do I customize the AI's personality and tone?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`What analytics and metrics can I track?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`How does the booking system work?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />

        <FAQdropdown
          question={`Is the system fully automated?`}
          answer={`The AI Setter uses advanced natural language processing with the custom "JamieGPT Tone" to create authentic, personalized conversations. It automatically identifies a follower's dating struggles (confidence, attraction, mindset) and guides them through a 4-step response framework to naturally book discovery calls.`}
        />
      </div>
    </div>
  );
};

export default Help;
