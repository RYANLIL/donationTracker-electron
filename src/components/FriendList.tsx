import { Friend, db } from "@/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import IPerson from "models/Persons";
interface props {
  minAge: number;
  maxAge: number;
}

export function FriendList({ minAge, maxAge }: props) {
  //const friends = useLiveQuery(() => db.friends.toArray());

  const friends = useLiveQuery(
    async () => {
      console.clear();
      //
      // Query Dexie's API
      //
      const friends = await db.friends
        .where("age")
        .between(minAge, maxAge)
        .toArray();
      console.log(friends);
      friends.forEach((p) => {
        console.log("Found: " + p.name + " with phone number " + p.age);
      });
      console.warn("");
      let collection = db.friends.where("age").aboveOrEqual(2);

      collection.each(function (friend) {
        console.log(
          "Found: " + friend.name + " with phone number " + friend.age
        );
      });
      console.log(collection);

      // Return result
      return friends;
    },
    // specify vars that affect query:
    [minAge, maxAge]
  );

  return (
    <ul>
      {friends?.map((friend) => (
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>
      ))}
    </ul>
  );
}
