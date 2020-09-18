import { dbService } from "fbase";
import React, { useState, useEffect } from "react";
import Mooweet from "components/Mooweet";

const Home = ({ userObj }) => {
  const [mooweet, setMooweet] = useState("");
  const [mooweets, setMooweets] = useState([]);
  /* Old version of getting document */
  // const getMooweets = async () => {
  //   const dbmooweets = await dbService.collection("mooweets").get();
  //   dbmooweets.forEach((document) => {
  //     const mooweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     // add new one to existing list
  //     setMooweets((prev) => [mooweetObject, ...prev]);
  //   });
  // };
  /* Real Time: Render less */
  useEffect(() => {
    // getMooweets();
    // listen to any operation/changes on database
    dbService.collection("mooweets").onSnapshot((snapshot) => {
      const mooweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMooweets(mooweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // create Document on firebase database
    await dbService.collection("mooweets").add({
      text: mooweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setMooweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMooweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={mooweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="mooweet" />
      </form>
      <div>
        {mooweets.map((mooweet) => (
          <Mooweet
            key={mooweet.id}
            mooweetObj={mooweet}
            isOwner={mooweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
