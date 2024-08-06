import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useRef, useState } from "react";

type Option = { value: string; label: string };

interface FancyMultiSelectProps {
  title: string;
  options: Option[];
  onSelectionChange: (selected: Option[]) => void;
}

export function FancyMultiSelect({ title, options, onSelectionChange }: FancyMultiSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((option: Option) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.value !== option.value);
      onSelectionChange(newSelected);
      return newSelected;
    });
  }, [onSelectionChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              onSelectionChange(newSelected);
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onSelectionChange]
  );

  const filteredOptions = options.filter(
    (option) =>
      !selected.includes(option) &&
      option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary" className="bg-white text-gray-500 ">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selected.length > 0 ? "":`Select ${title.toLowerCase()}...`}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-100"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls="option-list"
          />
        </div>
      </div>
      {open && filteredOptions.length > 0 && (
        <div className="relative mt-2">
          <CommandList>
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {filteredOptions.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => {
                          const newSelected = [...prev, option];
                          onSelectionChange(newSelected);
                          return newSelected;
                        });
                      }}
                      className="cursor-pointer"
                      role="option"
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      )}
    </Command>
  );
}
