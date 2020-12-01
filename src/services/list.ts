import { client } from "./api";
import { PAGE_LIMIT, INVENTORY_TYPES } from "../static/types";

const listOrderQuery = (pageNo: number) => `{
  totalCount :order_entry_aggregate{
    aggregate {
      totalCount: count
    }
  }
 list : order_entry(limit: ${PAGE_LIMIT}, offset: ${pageNo},order_by: {bill_no: desc}) {
    amount
    comments
    created_date
   name : order_name
   bill_no
   status : order_status
  }
}`;

const listServiceQuery = (pageNo: number) => `{
  totalCount :service_entry_aggregate{
    aggregate {
      totalCount: count
    }
  }
 list : service_entry(limit: ${PAGE_LIMIT}, offset: ${pageNo},order_by: {bill_no: desc}) {
    amount
    comments
    created_date
   name : model
  bill_no
  status 
  }
}`;

export const getListData = async (type: string, pageNo: any) => {
  try {
    const query =
      type === INVENTORY_TYPES.service
        ? listServiceQuery(pageNo)
        : listOrderQuery(pageNo);

    const listQueryAPI = await client({
      body: {
        query,
      },
    });
    return listQueryAPI;
  } catch (err) {
    return Promise.reject("insert failed");
  }
};
