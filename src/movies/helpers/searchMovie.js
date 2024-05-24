const url = import.meta.env.VITE_REACT_API_URL;
const key = import.meta.env.VITE_REACT_API_KEY;

export const searchMovie =async(query) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + key
        }
      };

      try {
        const resp = await fetch(`${url}/search/movie?query=${query}`, options)
        const response = await resp.json();
        return response;
      } catch (error) {
        console.log(error);
      }

}
