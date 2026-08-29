import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type SearchProps = {
  onSearch: (value: string) => void;
};
const SearchBlock = ({onSearch} :SearchProps) => {
  return (
    <div className="border border-black/30 rounded-2xl">
    <InputGroup className="max-w-xs px-4 py-6 w-2xl flex items-center rounded-2xl">
      <InputGroupInput className="placeholder:text-lg text-lg! text-gray-700/75" onChange={(e) => onSearch(e.target.value)} placeholder="What are you looking for ?" />
      <InputGroupAddon>
        <Search className="w-6! h-6!" />
      </InputGroupAddon>
    </InputGroup>
    </div>
  )
}

export default SearchBlock