const advancedWrapStep = ["Select Make", "Select Model", "Select Color"];
export default function AdvanceStepWrap({ advanceStep }) {
  <div className="">
    <div className="w-full h-full">
      <div className="py-6 flex justify-center md:block">
        <div className="flex items-center space-x-6 w-full justify-center">
          {advancedWrapStep.map((label, index) => (
            <div key={label} className="flex items-center space-x-2">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index < advanceStep
                    ? "bg-blue-600" // Completed step
                    : index === advanceStep
                    ? "bg-blue-900" // Active step
                    : "bg-gray-200 text-gray-400" // Future step
                }`}
              >
                {index < advanceStep ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Connector Line */}
              {index !== advancedWrapStep.length - 1 && (
                <div
                  className={`h-0.5 flex-grow ${
                    index < advanceStep
                      ? "bg-blue-900" // Line for completed steps
                      : "bg-gray-200" // Line for future steps
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm font-medium">
          {advancedWrapStep.map((label, index) => (
            <span
              key={label}
              className={`${
                index === advanceStep
                  ? "text-blue-900 font-bold" // Active step text
                  : index < advanceStep
                  ? "text-black" // Completed step text
                  : "text-gray-400" // Future step text
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>;
}
