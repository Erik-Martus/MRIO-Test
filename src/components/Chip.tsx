import * as React from "react";

interface ChipProps {
  label: string;
  variant?: string;
}

export default function Chip(props: ChipProps) {
  const { label, variant } = props;
  const classList = ["chip"];

  if (variant) {
    classList.push(`chip-${variant}`);
  }

  return <span className={classList.join(" ")}>{label}</span>;
}
