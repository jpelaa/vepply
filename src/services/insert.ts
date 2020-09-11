import { client } from "./api";
import { DATE_FORMAT_OPTIONS } from "static/types";

export const insertServiceEntry = async (entryData: any) => {
  try {
    const insertServiceEntryAPI = await client({
      body: {
        query: `mutation InsertServiceEntry {
            insert_service_entry(objects: {amount: ${
              entryData.amount
            }, comments: "${
          entryData.comments
        }", created_date: "${new Intl.DateTimeFormat(
          "en-US",
          DATE_FORMAT_OPTIONS
        ).format(entryData.created_date)}", model: "${
          entryData.model
        }", status: "${entryData.status}"}) {
                affected_rows
            }
            }`,
      },
    });
    return insertServiceEntryAPI.insert_service_entry.affected_rows;
  } catch (err) {
    return Promise.reject("insert failed");
  }
};

export const insertOrderEntry = async (entryData: any) => {
  try {
    const insertServiceEntryAPI = await client({
      body: {
        query: `mutation MyMutation {
  insert_order_entry(objects: {amount: ${entryData.amount}, comments: "${
          entryData.comments
        }", created_date: "${new Intl.DateTimeFormat(
          "en-US",
          DATE_FORMAT_OPTIONS
        ).format(entryData.created_date)}", order_name: "${
          entryData.order_name
        }", order_status: "${entryData.status}"}) {
    affected_rows
  }
}`,
      },
    });
    return insertServiceEntryAPI.insert_order_entry.affected_rows;
  } catch (err) {
    return Promise.reject("insert failed");
  }
};
