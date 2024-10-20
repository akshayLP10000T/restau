import { useRestaurentStore } from "@/store/useRestaurentStore";
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export interface IFilterOptions {
  id: string;
  label: string;
};

const filterOptions: IFilterOptions[] = [
  {
    id: "burgur",
    label: "burgur",
  },
  {
    id: "momos",
    label: "momos",
  },
  {
    id: "chowmein",
    label: "chowmein",
  },
  {
    id: "beer",
    label: "beer",
  },
]

const Filter = () => {

  const { setAppliedFilters, appliedFilter, resetFilter } = useRestaurentStore();

  const appliedFilterHandler = (text: string) => {
    setAppliedFilters(text);
  }

  return (
    <div className="lg:w-72 md:w-48">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={'link'} 
        className="hover:no-underline"
        onClick={()=>resetFilter()}
        >
          Reset
        </Button>
      </div>

      {
        filterOptions.map((option: IFilterOptions) => {
          return (
            <div key={option.id} className="flex items-center space-x-2 my-5">
              <Checkbox
                id={option.id}
                checked={appliedFilter.includes(option.label)}
                onClick={() => {
                  appliedFilterHandler(option.label)
                }}
                className="checked:border-primaryColor checked:bg-primaryColor"
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{option.label}</Label>
            </div>
          )
        })
      }

    </div>
  )
}

export default Filter