import { client } from "./api";

export const getAllStaticData = async () => {
  try {
    const orderStatuAPI = await client({
      body: {
        query: `{
  order_status {
    label
    value
    color
  }
}`,
      },
    });
    const serviceStatuAPI = await client({
      body: {
        query: `{
  service_status {
    label
    value
    color
  }
}`,
      },
    });

    localStorage.setItem("isStaticDataLoaded", "true");
    localStorage.setItem(
      "Service_status_list",
      JSON.stringify(serviceStatuAPI.service_status)
    );
    localStorage.setItem(
      "Order_status_list",
      JSON.stringify(orderStatuAPI.order_status)
    );
  } catch (err) {
    return Promise.reject("failed");
  }
};

export const getModel = (searchParams: string) => {
  return new Promise(async (resolve) => {
    try {
      const modelAPI = await client({
        body: {
          query: `{service_entry(distinct_on: model,
                        where: {model: {_like: "%${searchParams}%"}}
                    ) {
                       label : model
                       value : model
                    }}`,
        },
      });
      console.log(modelAPI, " modelList API");
      return resolve(modelAPI.service_entry);
    } catch (err) {
      return Promise.reject("failed");
    }
  });
};
