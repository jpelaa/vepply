import { client } from "./api";

export const checkCredentials = async (loginDetails: any) => {
  try {
    const loginServiceEntryAPI = await client({
      body: {
        query: `{
   users(where: {password: {_eq: "${loginDetails.password}"}, user_name: {_eq: "${loginDetails.userName}"}}) {
    access
  }
}`,
      },
    });
    if (loginServiceEntryAPI.users.length === 0)
      return Promise.reject("insert failed");

    return {
      hasLogin: loginServiceEntryAPI.users.length > 0,
      userName: loginDetails.userName,
      hasAccess:
        loginServiceEntryAPI.users.length > 0 &&
        loginServiceEntryAPI.users[0].access,
    };
  } catch (err) {
    return Promise.reject("insert failed");
  }
};
