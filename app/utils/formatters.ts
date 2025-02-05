import { PublicKey } from "@solana/web3.js";

import Decimal from "decimal.js";

export const formatPubKey = (pubKeyOrAddress: PublicKey | string): string => {
  const address =
    typeof pubKeyOrAddress === "string"
      ? pubKeyOrAddress
      : pubKeyOrAddress.toBase58();

  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatPrice = (price: Decimal | number) => {
  const p = price.toString();
  if (p.charAt(0) !== "0") return p;
  const pointIndex = p.indexOf(".");
  let totalZero = 0;
  let firstNonZeroIndex = 0;
  for (let i = pointIndex + 1; i < p.length; i++) {
    if (p.charAt(i) === "0") {
      totalZero++;
    } else {
      firstNonZeroIndex = i;
      break;
    }
  }
  return `0.0{${totalZero}}${p.substring(
    firstNonZeroIndex,
    firstNonZeroIndex + 5
  )}`;
};
