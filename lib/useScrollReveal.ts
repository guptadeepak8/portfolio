"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}
