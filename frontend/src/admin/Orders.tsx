import SampleOrder, { Data } from "./Orders/SampleOrder";

const Orders = () => {
  const orders = [
    {
      name: "Akshay Sharma",
      address: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quis voluptas nihil"
    },
    {
      name: "Acha insaan",
      address: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quis voluptas nihil"
    },
    {
      name: "Akshay Sharma",
      address: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quis voluptas nihil"
    },
  ]

  return (
    <div className="p-3 w-full h-full">
      <h1 className="text-3xl font-extrabold">Orders overview</h1>
      <div className="flex flex-col gap-3 w-full h-full mt-6">
        {
          orders.map((item: Data, idx: number)=>{
            return (
              <SampleOrder key={idx} data={item} />
            )
          })
        }
      </div>
    </div>
  );
};

export default Orders;
