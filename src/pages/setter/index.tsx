import React, { useState } from "react";

const Setter = () => {
  return (
    <div>
      <input onChange={(e) => localStorage.setItem('test', e.target.value)} />
      <button>Установить</button>
    </div>
  );
};

export default Setter;
