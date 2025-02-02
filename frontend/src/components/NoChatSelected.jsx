import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 ">
      <div className="sm:max-w-md text-center space-y-6 max-w-[89px] mx-auto">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce w-8 h-8" 
            >
              <MessageSquare className="sm:w-8 sm:h-8 text-primary w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="sm:text-2xl font-bold ">Welcome to ChatterWave!</h2>
        <p className="text-base-content/60 sm:text-lg text-xs">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
