import { useState, useEffect } from "react";
import { MdHourglassBottom, MdHourglassTop } from "react-icons/md";

export type LoadingIndicatorProps = {
  size: string;
  color: string;
};

export function LoadingIndicator({ size, color }: LoadingIndicatorProps) {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setTop(!top), 500);
    return () => clearTimeout(timeoutId);
  }, [top]);

  return top ? (
    <MdHourglassTop size={size} color={color} />
  ) : (
    <MdHourglassBottom size={size} color={color} />
  );
}
