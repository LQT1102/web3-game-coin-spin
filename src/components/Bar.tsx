"use client";
import React, { useEffect } from "react";

//Server component
function Bar(props: any) {
  useEffect(() => {
    console.log("Client component redered");
  }, []);

  return <div>Bar</div>;
}

export default Bar;
