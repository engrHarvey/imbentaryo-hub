// Helper function to check if user is logged in
export const isUserLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};
