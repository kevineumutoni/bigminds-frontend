const baseUrl = process.env.REACT_APP_BASE_URL;

export const fetchUsersData = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/`);
    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }
    const users = await response.json();
    return users.map((user, idx) => ({
      ...user,
      serial: idx + 1,
    }));
  } catch (error) {
    throw new Error(error.message ?? "Couldn't complete your request");
  }
};

