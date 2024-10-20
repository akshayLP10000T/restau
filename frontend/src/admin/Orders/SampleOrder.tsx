import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface Data{
    name: string,
    address: string;
}

type Props = {
    data: Data;
}

const SampleOrder = (props: Props) => {
  return (
    <div className="w-full h-fit p-2 shadow-md hover:shadow-xl transition-shadow duration-200 border md:px-9 md:py-4 px-5 py-2">
          <h2 className="text-2xl font-bold text-gray-800">{props.data.name}</h2>
          <p className="font-semibold text-lg text-gray-800">
            Address:{" "}
            <span className="font-normal text-base text-gray-600">
              {props.data.address}
            </span>
          </p>
          <div className="mt-3 text-lg">
            <Label className="text-gray-700 font-medium text-sm">
              Order status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    ["Pending", "Confirmed", "Preparing", "Out For Delievery", "Delivered"].map((status: string, idx: number)=>{
                      return (
                        <SelectItem key={idx} value={status.toLowerCase()}>{status}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
  )
}

export default SampleOrder