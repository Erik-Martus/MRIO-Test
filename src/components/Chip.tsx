import * as React from "react";

interface ChipProps {
  label: string;
  variant: string;
}

export default function Chip(props: ChipProps) {
  const { label, variant } = props;

  return (
    <span className={"chip" + variant ? ` chip-${variant}` : ""}>{label}</span>
  );
}
