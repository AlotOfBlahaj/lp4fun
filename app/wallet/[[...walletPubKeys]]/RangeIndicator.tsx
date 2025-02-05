// app/wallet/[[...walletPubKeys]]/RangeIndicator.tsx
import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useTheme } from "../../contexts/ThemeContext";
import { getPriceFromBinId } from "@/app/utils/dlmm";
import { formatPrice } from "@/app/utils/formatters";

interface RangeIndicatorProps {
  position: { lowerBinId: number; upperBinId: number };
  activeBin: number;
  binStep: number;
  mintXDigits: number;
  mintYDigits: number;
}

const RangeIndicator: React.FC<RangeIndicatorProps> = ({
  position,
  activeBin,
  binStep,
  mintXDigits,
  mintYDigits,
}) => {
  const { theme } = useTheme();
  const { lowerBinId, upperBinId } = position;
  const isInRange = activeBin >= lowerBinId && activeBin <= upperBinId;

  const getVisualElement = () => {
    const baseLineClass =
      "w-full h-2 bg-gray-300 rounded-full relative";
    const indicatorClass =
      "absolute top-1/2 h-4 w-1 rounded-full transform -translate-y-1/2";

    let indicatorColor = "bg-green-500";
    let indicatorPosition: string;

    if (activeBin < lowerBinId) {
      indicatorColor = "bg-red-500";
      indicatorPosition = "0%";
    } else if (activeBin > upperBinId) {
      indicatorColor = "bg-yellow-500";
      indicatorPosition = "100%";
    } else {
      indicatorPosition = `${
        ((activeBin - lowerBinId) / (upperBinId - lowerBinId)) * 100
      }%`;
    }

    return (
      <div className={baseLineClass}>
        <div
          className={`${indicatorClass} ${indicatorColor}`}
          style={{ left: indicatorPosition }}
        />
      </div>
    );
  };

  const rangeColor = isInRange ? "text-green-500" : "text-red-500";

  return (
    <div className="w-full py-2">
      <div className="hover:opacity-75 transition-opacity duration-200">
        {getVisualElement()}
      </div>
      <div className="flex flex-col mt-4">
        <div className="mb-2">
          <span className="font-medium whitespace-nowrap">Current Price:</span>
          <span className="text-blue-500 font-medium">
            $
            {formatPrice(
              getPriceFromBinId(activeBin, binStep, mintXDigits, mintYDigits)
            )}
          </span>
        </div>
        <div>
          <span className="font-medium whitespace-nowrap">Active Range:</span>
          <span className="${rangeColor} font-medium whitespace-nowrap">
            $
            {formatPrice(
              getPriceFromBinId(lowerBinId, binStep, mintXDigits, mintYDigits)
            )}{" "}
            → $
            {formatPrice(
              getPriceFromBinId(upperBinId, binStep, mintXDigits, mintYDigits)
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RangeIndicator;
