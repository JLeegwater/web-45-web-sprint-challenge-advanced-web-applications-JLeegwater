import axiosWithAuth from "../helpers/axiosWithAuth";

const fetchColorService = () => {
  return axiosWithAuth()
    .get("colors")
    .catch((err) => console.error(err));
};

export default fetchColorService;
