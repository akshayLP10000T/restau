import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
    text: string | undefined;
}

const NoResultFound = (props: Props) => {
  return (
    <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No result found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
            Soory, but we doesn't found any result of "{props.text}". Try using other keywords.
        </p>
        <Link to={"/"}>
        <Button className="bg-primaryColor hover:bg-hoverPrimaryColor">
            Back to Home
        </Button>
        </Link>
    </div>
  )
}

export default NoResultFound