"use client";

import { useFetchApi } from "@/app/hooks/useFetchApi";

const Client = () => {
  const data = useFetchApi("schools");

  console.log(data);

  return <div></div>;
};

export default Client;
