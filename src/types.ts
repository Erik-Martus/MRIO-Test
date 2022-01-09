export type PurchaseOrder = {
  order_number: number;
  customer: {
    first_name: string;
    last_name: string;
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  order_details: {
    value: number;
    date: string;
  };
  shipping_details: {
    date: string;
  };
  status: string;
};
