"use client";

import { useState, type ChangeEvent } from "react";

/**
 * input 상태 관리 커스텀 훅
 * @example
 * const [value, onChange, reset] = useInput("");
 */
export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue(initialValue);

  return [value, onChange, reset] as const;
}
