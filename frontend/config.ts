export const config = {
  URL:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_URL
      : process.env.NEXT_PUBLIC_LOCAL_URL,
};
