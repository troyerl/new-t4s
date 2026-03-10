// import { Component, component$, QRL } from "@builder.io/qwik";
// import { ChevronUpDown } from "@src/components/icons";
// import _ from "lodash";

// interface SelectProps {
//   options: { label: Component | string; value: string }[];
//   value: string;
//   class?: string;
//   onChange?: QRL<(e: string) => void>;
//   outline?: boolean;
//   disabled?: boolean;
// }

// export default ({
//   options,
//   value,
//   class: className,
//   onChange,
//   outline = true,
//   disabled,
// }: SelectProps) => {
//   return (
//     <>
//       <el-select
//         id="select"
//         name="selected"
//         value={value}
//         class={`block ${className}`}
//         onChange$={(e: any) => onChange?.(e.target.value)}
//         disabled={disabled}
//       >
//         <button
//           type="button"
//           className={`grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 ${outline ? `outline-1` : "outline-white/10"} -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed sm:text-sm/6`}
//           disabled={disabled}
//         >
//           <el-selectedcontent class="col-start-1 row-start-1 truncate pr-6 text-black">
//             {_.find(options, { value })?.label || "Select an option"}
//           </el-selectedcontent>
//           <ChevronUpDown class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400" />
//         </button>
//         <el-options
//           anchor="bottom start"
//           // @ts-expect-error: This is from tailwind
//           popover
//           class="max-h-60 w-(--button-width) overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
//         >
//           {options.map((option) => (
//             <el-option
//               key={option.value}
//               value={option.value}
//               class="group/option relative block cursor-pointer py-2 pr-9 pl-3 text-gray-900 select-none group-aria-selected/option:bg-gray-100 focus:bg-gray-200 focus:outline-hidden"
//             >
//               <span class="block truncate font-normal group-aria-selected/option:font-semibold">
//                 {option.label}
//               </span>
//               <span class="text-primary absolute inset-y-0 right-0 flex items-center pr-4 group-not-aria-selected/option:hidden in-[el-selectedcontent]:hidden">
//                 <svg
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                   data-slot="icon"
//                   aria-hidden="true"
//                   class="size-5"
//                 >
//                   <path
//                     d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
//                     clip-rule="evenodd"
//                     fill-rule="evenodd"
//                   />
//                 </svg>
//               </span>
//             </el-option>
//           ))}
//         </el-options>
//       </el-select>
//     </>
//   );
// };
