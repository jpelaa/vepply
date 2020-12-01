import { client } from "./api";
import { INVENTORY_TYPES } from "../static/types";

const getOrderEntryUpdatingStatusQuery = (
  billNo: string,
  orderStatus: string,
  comments: string
) => {
  return `mutation MyMutation {
 change_status : update_order_entry(where: {bill_no: {_eq: "${billNo}"}}, _set: {order_status: "${orderStatus}" , comments: "${comments}"}) {
    affected_rows
  }
}`;
};

const getServiceEntryUpdatingStatusQuery = (
  billNo: string,
  orderStatus: string,
  comments: string
) => {
  return `mutation MyMutation {
  change_status : update_service_entry(where: {bill_no: {_eq: "${billNo}"}}, _set: {status: "${orderStatus}" , comments : "${comments}"}) {
    affected_rows
  }
}`;
};

export const updateStatus = async (
  selectedCategory: string,
  billNo: string,
  orderStatus: string,
  comments: string
) => {
  try {
    const updateServiceEntryAPI = await client({
      body: {
        query:
          selectedCategory === INVENTORY_TYPES.order
            ? getOrderEntryUpdatingStatusQuery(billNo, orderStatus, comments)
            : getServiceEntryUpdatingStatusQuery(billNo, orderStatus, comments),
      },
    });
    return updateServiceEntryAPI.change_status.affected_rows;
  } catch (err) {
    return Promise.reject("insert failed");
  }
};
