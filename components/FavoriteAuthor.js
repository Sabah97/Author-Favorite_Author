import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

const FavoriteAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noFav, setNoFav] = useState(false);

  const addFav = (index, bio, link, name, _id) => {
    // console.log('addFav -> index', index);
    let temp = [...authors];
    temp[index].isFav = true;
    setAuthors(temp);

    let favs = JSON.parse(localStorage.getItem("favs"));
    if (!favs) {
      favs = [
        {
          bio,
          link,
          name,
          _id,
          isFav: true,
        },
      ];
    } else {
      favs.push({ bio, link, name, _id, isFav: true });
    }
    localStorage.setItem("favs", JSON.stringify(favs));
  };

  const removeFav = (index, _id) => {
    console.log("removeFav -> _id", _id);
    let temp = [...authors];
    temp[index].isFav = false;
    setAuthors(temp);
    let favs = JSON.parse(localStorage.getItem("favs"));

    if (favs) {
      favs = favs.filter((fav) => fav._id !== _id);
      localStorage.setItem("favs", JSON.stringify(favs));
    }
  };

  useEffect(() => {
    setLoading(true);

    let favs = JSON.parse(localStorage.getItem("favs"));
    if (favs && favs.length > 0) {
      setAuthors(favs);
      setNoFav(false);
    } else {
      setNoFav(true);
    }

    setLoading(false);
  }, [authors]);

  if (noFav) {
    return (
      <div style={{ marginLeft: "3rem", marginTop: "2rem" }}>
        You have no saved Favorite Author
      </div>
    );
  }
  return (
    <div className="flex flex-row ml-12 mt-6">
      {loading ? (
        <button type="button" class="bg-indigo-500 p-2" disabled>
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </button>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 p-12">
          {" "}
          {authors.map(({ bio, link, name, _id, isFav }, index) => (
            <div className="mt-3 flex flex-col" key={_id} xs={6}>
              <ListItem
                _id={_id}
                name={name}
                bio={bio}
                link={link}
                isFav={isFav}
                addFav={addFav}
                removeFav={removeFav}
                index={index}
              ></ListItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteAuthor;
