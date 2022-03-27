import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

import Pagination from "react-bootstrap/Pagination";

const Author = () => {
  const [pageNumber, setpageNumber] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // localStorage.clear();

    let favs = JSON.parse(localStorage.getItem("favs"));
    if (favs) {
      var favIds = favs.map((fav) => fav._id);
    }

    fetch(`https://api.quotable.io/authors?limit=10&skip=${pageNumber * 10}`)
      .then((res) => res.json())
      .then(({ results }) => {
        let newRes = [];

        results.forEach((result) => {
          if (favIds) {
            favIds.forEach((favId) => {
              result._id === favId
                ? (result.isFav = true)
                : (result.isFav = false);
            });
          } else {
            result.isFav = false;
          }

          newRes.push(result);
        });

        setAuthors(newRes);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log("fetch quote err", err));
  }, [pageNumber]);

  return (
    <div className="flex flex-row ml-12 mt-6">
      {loading ? (
        <button type="button" class="bg-indigo-500 p-2 text-white" disabled>
          <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </button>
      ) : (
        <div>
          {" "}
          <div className="grid lg:grid-cols-3 gap-6 p-12">
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
          <div className="flex justify-center mb-4">
            <Pagination
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Pagination.Prev
                style={{
                  backgroundColor: "white",
                  padding: "4px",
                  border: "blue solid 2px",
                  width: "60%",
                  paddingTop: "16px",
                }}
                onClick={() => {
                  pageNumber > 1 && setpageNumber((no) => no - 1);
                  window.scrollTo(0, 0);
                }}
              />
              {pageNumber === !1 && <Pagination.Item>{1}</Pagination.Item>}

              <Pagination.Item
                style={{
                  paddingLeft: "2px",
                  paddingTop: "10px",
                  padding: "1rem",
                  width: "70%",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                {pageNumber}
              </Pagination.Item>

              <Pagination.Next
                style={{
                  backgroundColor: "white",
                  padding: "0.5rem",
                  border: "blue solid 2px",
                  paddingTop: "16px",
                }}
                onClick={() => {
                  setpageNumber((no) => no + 1);
                  window.scrollTo(0, 0);
                }}
              />
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default Author;
