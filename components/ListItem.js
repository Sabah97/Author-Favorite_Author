import React from "react";

const ListItemComponent = ({
  name,
  bio,
  link,
  _id,
  isFav,
  index,
  addFav,
  removeFav,
}) => {
  return (
    <div className="flex flex-row justify-between border-2 border-green-600 p-4  ">
      <div className="flex flex-col w-8/12">
        <h4>Name: {name}</h4>
        <h4>Bio: {bio}</h4>
        <h4>
          Link: <a href={link}>{link}</a>
        </h4>
      </div>
      <div>
        <button
          className="bg-green-700 p-2 text-white font-medium"
          onClick={() => {
            isFav ? removeFav(index, _id) : addFav(index, bio, link, name, _id);
          }}
        >
          {isFav ? "Remove Favorite" : "Add Favorite"}
        </button>
      </div>
    </div>
  );
};

export default ListItemComponent;
