export const config = {
  URL:
    process.env.NODE_ENV === "production"
      ? "https://my-earth-backend.herokuapp.com/"
      : "http://localhost:5000/",
};
