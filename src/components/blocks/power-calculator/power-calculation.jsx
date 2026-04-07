"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/utils/typography";
import parse from "html-react-parser";
import { motion, AnimatePresence } from "motion/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

const inputClasses =
  "text-[10px] md:text-[10px] xl:text-[12px] 2xl:text-[13px] 3xl:text-[16px] leading-none font-normal text-white placeholder:text-white/60 w-full h-7 xl:h-8 2xl:h-9 3xl:h-11 bg-[#252525] dark:bg-[#252525] border-[#676767]/80 rounded-[6px] 3xl:rounded-[9px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-white selection:bg-primary-800 appearance-none shadow-none px-4";

export default function PowerCalculation({ data, appliances, highestPower }) {
  const router = useRouter();
  const [items, setItems] = useState(() =>
    (appliances || []).map((appliance, index) => ({
      name: appliance.name,
      powerOptions: appliance.powerOptions,
      rows: [{ id: index + 1, power: "", count: "" }],
    })),
  );
  const [invalidRows, setInvalidRows] = useState(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalVA = useMemo(() => {
    return items.reduce((acc, item) => {
      const itemTotal = item.rows.reduce((rowAcc, row) => {
        let powerVal = parseFloat(row.power) || 0;
        if (row.power.toLowerCase().includes("kw")) {
          powerVal *= 1000;
        }
        const countVal = parseFloat(row.count) || 0;
        return rowAcc + powerVal * countVal;
      }, 0);
      return acc + itemTotal;
    }, 0);
  }, [items]);

  const handleAddItem = (index) => {
    const newItems = [...items];
    newItems[index].rows.push({ id: Date.now(), power: "", count: "" });
    setItems(newItems);
  };

  const handleRemoveItem = (itemIndex, rowIndex) => {
    const newItems = [...items];
    newItems[itemIndex].rows.splice(rowIndex, 1);
    setItems(newItems);
  };

  const handleUpdateItem = (itemIndex, rowIndex, field, value) => {
    const newItems = [...items];
    newItems[itemIndex].rows[rowIndex][field] = value;
    setItems(newItems);

    if (field === "count") {
      setInvalidRows((prev) => {
        const next = new Set(prev);
        next.delete(newItems[itemIndex].rows[rowIndex].id);
        return next;
      });
    }
  };

  const handleClickHere = () => {
    const errorIds = new Set();
    items.forEach((item) => {
      item.rows.forEach((row) => {
        if (row.power && !row.count) {
          errorIds.add(row.id);
        }
      });
    });

    setInvalidRows(errorIds);

    if (errorIds.size > 0) {
      return;
    }

    setInvalidRows(new Set());

    if (totalVA > 0) {
      if (!highestPower || totalVA <= parseFloat(highestPower)) {
        router.push(
          `/products?backup_capacity=${totalVA}&from=power_calculator`,
        );
      } else {
        setDialogOpen(true);
      }
    }
  };

  return (
    <section className="w-full h-auto block pt-8 xl:pt-10 2xl:pt-12 3xl:pt-15 pb-15 xl:pb-35 2xl:pb-40 3xl:pb-50 bg-[#181818]">
      <div className="container">
        <Heading
          as="h2"
          size="h1"
          className="text-medium text-white mb-4 sm:mb-6 xl:mb-10 2xl:mb-12.5 3xl:mb-15"
        >
          {data?.title}
        </Heading>
        <div className="flex flex-wrap sm:gap-x-6 xl:gap-x-10 2xl:gap-x-12.5 3xl:gap-x-15">
          <div className="w-full md:flex-1 max-md:mb-3">
            <div className="w-full overflow-x-auto rounded-[6px] 2xl:rounded-[7px] 3xl:rounded-[8px] border border-white/35 overflow-hidden">
              <table className="w-full min-w-[368px] border-collapse [&_td]:p-3 sm:[&_td]:p-3 xl:[&_td]:p-4 2xl:[&_td]:p-5 3xl:[&_td]:p-6">
                <thead>
                  <tr>
                    {[
                      { name: "Appliances" },
                      { name: "Power" },
                      { name: "No." },
                    ].map((item, index) => (
                      <th
                        key={item.name}
                        className={cn(
                          "bg-[#333] border-b border-white/35 px-3 sm:px-3 xl:px-4 2xl:px-5 3xl:px-6 py-2 sm:py-2 xl:py-2.5 2xl:py-3 3xl:py-3.5",
                          index === 0
                            ? "w-3/10 text-start"
                            : index === 1
                              ? "w-5/10 text-start"
                              : "w-2/10 text-start",
                        )}
                      >
                        <Text as="p" size="p1" className="text-white">
                          {item?.name}
                        </Text>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, itemIndex) => (
                    <tr
                      key={item.name}
                      className="border-b border-white/10 last:border-0"
                    >
                      <td className="align-top py-4">
                        <Text
                          as="p"
                          size="p1"
                          className="max-sm:text-[12px] leading-tight text-white"
                        >
                          {item?.name}
                        </Text>
                      </td>
                      <td className="align-top py-4">
                        <div className="flex flex-col gap-y-3">
                          <AnimatePresence initial={false}>
                            {item.rows.map((row, rowIndex) => (
                              <motion.div
                                key={row.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex gap-x-2 2xl:gap-x-2.5 3xl:gap-x-3 items-center "
                              >
                                <Select
                                  onValueChange={(val) =>
                                    handleUpdateItem(
                                      itemIndex,
                                      rowIndex,
                                      "power",
                                      val,
                                    )
                                  }
                                  value={row.power || undefined}
                                >
                                  <SelectTrigger
                                    className={cn(
                                      inputClasses,
                                      "data-[placeholder]:text-white data-[size=default]:h-7 xl:data-[size=default]:h-8 2xl:data-[size=default]:h-9 3xl:data-[size=default]:h-11 justify-between",
                                    )}
                                  >
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white">
                                    <SelectGroup>
                                      {item?.powerOptions
                                        ?.filter((opt) => opt === row.power || !item.rows.some((r) => r.power === opt))
                                        .map((opt) => (
                                          <SelectItem key={opt} value={opt}>
                                            {isNaN(Number(opt)) ? opt : opt + "W"}
                                          </SelectItem>
                                        ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>

                                {rowIndex === 0 ? (
                                  <Button
                                    onClick={() => handleAddItem(itemIndex)}
                                    size="lg"
                                    variant="outline"
                                    disabled={item.rows.length >= (item.powerOptions?.length || 0) || totalVA === 0}
                                    className="text-white rounded-full w-7 xl:w-8 2xl:w-9 3xl:w-11 h-7 xl:h-8 2xl:h-9 3xl:h-11 bg-[#152832] border-[#152832] p-0 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                                  >
                                    <Plus className="size-4" />
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      handleRemoveItem(itemIndex, rowIndex)
                                    }
                                    size="lg"
                                    variant="outline"
                                    className="text-white rounded-full w-7 xl:w-8 2xl:w-9 3xl:w-11 h-7 xl:h-8 2xl:h-9 3xl:h-11 bg-none border-none hover:bg-none p-0 shrink-0"
                                  >
                                    <X className="size-4" />
                                  </Button>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </td>
                      <td className="align-top py-4">
                        <div className="flex flex-col gap-y-3">
                          <AnimatePresence initial={false}>
                            {item.rows.map((row, rowIndex) => (
                              <motion.div
                                key={row.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="h-7 xl:h-8 2xl:h-9 3xl:h-11 flex items-center overflow-hidden"
                              >
                                <Input
                                  type="text"
                                  placeholder="No."
                                  value={row.count}
                                  onChange={(e) =>
                                    handleUpdateItem(
                                      itemIndex,
                                      rowIndex,
                                      "count",
                                      e.target.value.replace(/[^0-9]/g, ""),
                                    )
                                  }
                                  className={cn(
                                    inputClasses,
                                    "text-center px-0 w-10.5 2xl:w-13 3xl:w-16",
                                    invalidRows.has(row.id) && "border-red-500",
                                  )}
                                />
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full md:w-[220px] xl:w-[255px] 2xl:w-[355px] 3xl:w-[372px]">
            <div className="w-full bg-[#252525] border-[#676767]/80 rounded-[8px] 2xl:rounded-[10px] 3xl:rounded-[12px] px-4 sm:px-4 xl:px-7 2xl:px-8 3xl:px-9 py-5.5 sm:py-6 xl:py-9 2xl:py-11 3xl:py-13 sticky top-(--header-y)">
              <Text
                as="p"
                size="p1"
                className="text-white mb-2.5 2xl:mb-3 3xl:mb-4"
              >
                {data?.calculatorTitle}
              </Text>
              <Text
                as="div"
                size="p1"
                className="leading-tight text-white w-full h-8 xl:h-8 2xl:h-9 3xl:h-11 bg-white/10 border border-white rounded-[6px] 2xl:rounded-[7px] 3xl:rounded-[8px] flex items-center justify-center mb-4 2xl:mb-7 3xl:mb-9 font-medium"
              >
                {totalVA >= 1000
                  ? (totalVA / 1000).toFixed(2) + " kVA"
                  : totalVA + " VA"}
              </Text>
              <Text
                as="p"
                size="p1"
                className="text-white mb-2 2xl:mb-2.5 3xl:mb-3"
              >
                {data?.calculatorDescription}
              </Text>
              <Button
                onClick={handleClickHere}
                disabled={totalVA === 0}
                size="lg"
                variant="outline"
                className="text-white min-w-full rounded-[6px] 2xl:rounded-[7px] 3xl:rounded-[8px] h-8 xl:h-8 2xl:h-9 3xl:h-11 bg-[#008dd2] mb-4 2xl:mb-7 3xl:mb-9 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Click Here
              </Button>
              <PowerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
              <div className="text-[12px] lg:text-[10px] 2xl:text-[11px] 3xl:text-[14px] leading-normal font-light italic text-white/80">
                {parse(data?.calculatorNote)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PowerDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          "xl:max-w-[480px] 2xl:max-w-[576px] 3xl:max-w-[680px] bg-[#212121] py-8 sm:py-10 xl:py-14 2xl:py-16 3xl:py-20 px-4 sm:px-5 xl:px-7 2xl:px-8 3xl:px-10 rounded-[10px] 2xl:rounded-[12px] 3xl:rounded-[15px]"
        }
        closeClassName="3xl:size-4 top-2 right-2 3xl:top-4 3xl:right-4 text-[#858589] xl:[&_svg:not([class*='size-'])]:size-6 3xl:[&_svg:not([class*='size-'])]:size-8"
      >
        <DialogHeader className={"text-start"}>
          <DialogTitle asChild>
            <Heading
              as="h2"
              size="h4"
              className="leading-normal font-normal text-center text-white [&_a]:text-[#008dd2] [&_a]:underline [&_a]:underline-offset-4"
            >
              Sorry! Your power consumption is above standard usage levels.
              Please contact{" "}
              <i>
                <Link href="/customer-care">customer care</Link>{" "}
              </i>
              for customized solutions.
            </Heading>
          </DialogTitle>
          <DialogDescription className={"sr-only"}>
            Sorry! Your power consumption is above standard usage levels. Please
            contact customer care for customized solutions.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
