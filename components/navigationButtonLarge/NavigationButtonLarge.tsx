"use client";

import React from "react";
import styles from "./NavigationButtonLarge.module.css";
import { useRouter } from "next/navigation";

const NavigationButtonLarge: React.FC<{ title: string; route: string }> = ({
  title,
  route,
}) => {
  const router = useRouter();

  return (
    <button className={styles.button} onClick={() => router.push(route)}>
      {title}
    </button>
  );
};

export default NavigationButtonLarge;
