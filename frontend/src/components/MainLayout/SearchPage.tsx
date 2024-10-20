import { Input } from "../ui/input";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import FoodCard from "../SearchPage/FoodCard";
import { useParams } from "react-router-dom";
import { useRestaurentStore } from "@/store/useRestaurentStore";
import Filter from "../SearchPage/Filter";
import FoodCardSkeleton from "../SearchPage/FoodCardSkeleton";
import NoResultFound from "../SearchPage/NoResultFound";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

export interface IFilterOptions {
  id: string;
  label: string;
}

const SearchPage = () => {
  const [text, setText] = useState("");
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const params = useParams();
  const { searchRestaurent, appliedFilter, searchedRestaurent, loading, setAppliedFilters } =
    useRestaurentStore();

  useEffect(() => {
    searchRestaurent(params.text!, text, appliedFilter);
  }, [appliedFilter, params.text!, text]);

  
  return (
    <div className="w-full h-full flex justify-start md:flex-row flex-col md:gap-8 gap-3 md:p-5">
      <Filter />
      <div className="flex-1 flex gap-2 flex-col">
        <form onSubmit={submitHandler} className="flex gap-3">
          <Input
            type="text"
            placeholder="Search for you food..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-primaryColor hover:bg-hoverPrimaryColor"
          >
            Search
          </Button>
        </form>
        <div className="flex flex-wrap gap-3">
          <h1 className="font-medium text-lg">
            ({searchedRestaurent?.restaurents.length}) result found
          </h1>
          <div className="flex gap-3 flex-wrap items-center">
            {appliedFilter.map((selectedFilter: string, idx: number) => {
              return (
                <div>
                  <Badge onClick={()=> setAppliedFilters(selectedFilter)} key={idx} className="text-primaryColor transition-all duration-300 border-[1px] border-gray-400 cursor-pointer hover:text-white hover:bg-primaryColor hover:border-primaryColor">
                    {selectedFilter}
                    <X className="w-4 h-4 ml-1" />
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {loading ? (
              <FoodCardSkeleton />
            ) : !loading && searchedRestaurent.restaurents.length === 0 ? (
              <NoResultFound text={params.text?.toString()} />
            ) : (
              searchedRestaurent?.restaurents.map((data: any, idx: number) => {
                return <FoodCard key={idx} data={data} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
