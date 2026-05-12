const formatCompactNumber = (value: number, isCurrency = false): string => {
  if (!Number.isFinite(value)) {
    return isCurrency ? "$0" : "0";
  }

  const sign = value < 0 ? "-" : "";
  const absoluteValue = Math.abs(value);
  const prefix = isCurrency ? "$" : "";

  if (absoluteValue < 1000) {
    return `${sign}${prefix}${absoluteValue.toFixed(isCurrency ? 2 : 0)}`;
  }

  const suffixes = [
    { value: 1_000_000_000_000, label: "T" },
    { value: 1_000_000_000, label: "B" },
    { value: 1_000_000, label: "M" },
    { value: 1_000, label: "K" },
  ];

  const suffix = suffixes.find((item) => absoluteValue >= item.value);

  if (!suffix) {
    return `${sign}${prefix}${absoluteValue}`;
  }

  return `${sign}${prefix}${(absoluteValue / suffix.value).toFixed(1)}${
    suffix.label
  }`;
};

export const formatLargeMonetaryNumber = (value: number): string => {
  return formatCompactNumber(value, true);
};

export const formatLargeNonMonetaryNumber = (value: number): string => {
  return formatCompactNumber(value);
};

export const formatRatio = (ratio?: number): string => {
  if (ratio === undefined || ratio === null || !Number.isFinite(ratio)) {
    return "N/A";
  }

  return (Math.round(ratio * 100) / 100).toFixed(2);
};
