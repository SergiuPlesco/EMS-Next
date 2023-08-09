import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineSave } from "react-icons/ai";

const UserPosition = () => {
  const [position, setPosition] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handelEditing = () => {
    setIsEditing(true);
  };
  const handleSaving = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPosition(e.currentTarget.value);
  };
  return (
    <div className="flex items-center gap-1">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="position"
            className="border rounded p-1"
            value={position}
            onChange={handleChange}
          />
          <button onClick={handleSaving}>
            <AiOutlineSave size={24} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <p className="text-slate-500">Front End Developer</p>

          <button onClick={handelEditing}>
            <AiOutlineEdit size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPosition;
