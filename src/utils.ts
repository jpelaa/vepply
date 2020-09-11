export const getColorByStatus = (
  selectedCategory: string,
  status: string
): string => {
  let orderList: any = localStorage.getItem(`${selectedCategory}_status_list`);
  orderList = JSON.parse(orderList);
  console.log(orderList, " orderlist ");
  return orderList.find((data: any) => data.value === status).color;
};
