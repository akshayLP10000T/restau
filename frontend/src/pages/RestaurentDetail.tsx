import Header from "@/components/RestaurentDetail/Header";
import Menu from "@/components/RestaurentDetail/Menu";
import { useRestaurentStore } from "@/store/useRestaurentStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurentDetail = () => {
  const params = useParams();
  const { getSingleRestaurent, singleRestaurent } = useRestaurentStore();

  useEffect(() => {
    getSingleRestaurent(params.restaurentId!);
  }, [params.restaurentId]);

  return (
    <div className="relative w-full h-full pb-3">
      <Header data={singleRestaurent} />
      <Menu data={singleRestaurent.items} />
    </div>
  );
};

export default RestaurentDetail;
