import { dbService } from "fbase";
import React, { useState } from "react";

const Mooweet = ({ mooweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMooweet, setnewMooweet] = useState(mooweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this mooweet?");
    if (ok) {
      await dbService.doc(`mooweets/${mooweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`mooweets/${mooweetObj.id}`).update({
      text: newMooweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewMooweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your mooweet"
              value={newMooweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{mooweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Mooweet;
