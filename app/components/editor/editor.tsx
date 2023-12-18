"use client";

import React, { useState } from "react";

const CheckboxInput = () => {
  const [items, setItems] = useState([{ id: 1 }]);

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Enter") {
      const newItems = [...items];
      newItems.splice(index + 1, 0, { id: Date.now() });
      setItems(newItems);
    }
  };

  return (
    <div
      style={{ border: "1px solid #000", padding: "10px", minHeight: "100px" }}
      contentEditable="true"
    >
      {items.map((item, index) => (
        <div key={item.id}>
          <input type="checkbox" className="checkbox" />
          <input
            type="text"
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder="test"
          />
          <br />
        </div>
      ))}
    </div>
  );
};

export default CheckboxInput;
