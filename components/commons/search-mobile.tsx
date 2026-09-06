import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

export default function SearchMobile() {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="sm:hidden">
            <Search className="h-5 w-5" />
          </Button>
        }
      />
      <PopoverContent className="sm:hidden">
        <Input type="text" placeholder="Search..." />
      </PopoverContent>
    </Popover>
  );
}
