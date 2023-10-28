"use client";

import React, { useState } from "react";

import GoldenEditor from "../components/goldenEditor/goldenEditor";

const Page = () => {
  const [componentInstances, setComponentInstances] = useState([
    <GoldenEditor key={Date.now()} />,
  ]);

  const handleAddComponent = () => {
    const newComponentInstances = [
      ...componentInstances,
      <GoldenEditor key={Date.now()} />,
    ];
    setComponentInstances(newComponentInstances);
  };
  return (
    <div>
      <button onClick={handleAddComponent}>Add Component</button>
      {componentInstances.map((Component, index) => (
        <div key={index}>{Component}</div>
      ))}
    </div>
  );
};

export default Page;
