import { dbService } from "fbase";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [mooweet, setMooweet] = useState("");
  const [mooweets, setMooweets] = useState([]);
  const getMooweets = async () => {
    const dbmooweets = await dbService.collection("mooweets").get();
    dbmooweets.forEach((document) => {
      const mooweetObject = {
        ...document.data(),
        id: document.id,
      };
      // add new one to existing list
      setMooweets((prev) => [mooweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getMooweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    // create Document on firebase database
    await dbService.collection("mooweets").add({
      mooweet,
      createdAt: Date.now(),
    });
    setMooweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMooweet(value);
  };
  console.log(mooweets);
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
          <div key={mooweet.id}>
            <h4>{mooweet.mooweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
