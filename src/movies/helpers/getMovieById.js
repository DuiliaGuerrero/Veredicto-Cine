const url = import.meta.env.VITE_REACT_API_URL;
const key = import.meta.env.VITE_REACT_API_KEY;
export const getMovieById = async (id) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + key,
    },
  };

  try {
    const resp = await fetch(url + "/movie/" + id, options);
    const response = await resp.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
