// import { $, component$, QRL, Resource, useResource$ } from "@builder.io/qwik";
// import { useForm, valiForm$ } from "@modular-forms/qwik";
// import { Modal } from "@src/components/Modal";
// import * as v from "valibot";
// import { useReservationContext } from "../ReservationContextProvider";
// import { IShopper } from "@src/interface/Shopper";
// import BaseButton from "@src/components/Button/BaseButton";
// import { FormInputField } from "@src/components/Form";
// import { FormComboboxField } from "@src/components/Form/ComboboxField";
// import { grades } from "@src/constants";
// import schoolProvider from "@src/api/schoolProvider";
// import { clearCache, getData, queryKeys } from "@src/reactQuery";
// import SkeletonLoader from "@src/components/SkeletonLoader";
// import shopperProvider from "@src/api/shopperProvider";

// export const UserInfoSchema = v.object({
//   firstName: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your first name."),
//   ),
//   lastName: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your last name."),
//   ),
//   email: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please enter your email."),
//     v.email("Please provide a valid email"),
//   ),
//   school: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please select your school."),
//   ),
//   grade: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty("Please select the grade you teach."),
//   ),
//   classLoad: v.pipe(
//     v.string(),
//     v.trim(),
//     v.nonEmpty(
//       "Please enter your class load. This is needed to help us understand the number of students we are helping!",
//     ),
//   ),
// });

// export type IUserInfoForm = v.InferInput<typeof UserInfoSchema>;

// export default ({
//   shopper,
//   closeModal,
// }: {
//   shopper: IShopper;
//   closeModal: VoidFunction;
// }) => {
//   const { setShopper } = useReservationContext();
//   const schoolResource = useResource$(async () => {
//     return await getData<string[]>(
//       queryKeys.schools("name"),
//       async () => await schoolProvider.getSchoolNames(),
//     );
//   });

//   const [, { Form, Field }] = useForm<IUserInfoForm>({
//     loader: {
//       value: {
//         firstName: shopper?.firstName || "",
//         lastName: shopper?.lastName || "",
//         email: shopper?.email || "",
//         school: shopper?.school || "",
//         grade: shopper?.grade || "",
//         classLoad: shopper?.classLoad ? JSON.stringify(shopper?.classLoad) : "",
//       },
//     },
//     validate: valiForm$(UserInfoSchema),
//   });

//   const onCloseModal = (newShopperInfo: IShopper) => {
//     setShopper(newShopperInfo);
//     closeModal();
//   };

//   const handleSubmit: any = $(async (values: IUserInfoForm) => {
//     const newShopperInfo = {
//       ...values,
//       shopperId: shopper?.shopperId,
//       classLoad: parseInt(values.classLoad),
//     } as IShopper;

//     shopperProvider.updateShopper(newShopperInfo);
//     onCloseModal(newShopperInfo);

//     clearCache(queryKeys.getShopper(shopper?.shopperId, true));
//     clearCache(queryKeys.getShopper(shopper?.shopperId, false));
//   });

//   return (
//     <Modal show={!!shopper}>
//       <Form onSubmit$={handleSubmit} className="flex w-full flex-col gap-6 p-6">
//         <div className="flex w-full flex-col gap-2">
//           <h1 className="text-2xl font-semibold">Keep Us Updated!</h1>
//           <p className="text-sm font-light">
//             We want to make sure we have your latest info!
//           </p>
//         </div>
//         <Field name="firstName">
//           {(field: any, props: any) => (
//             <FormInputField
//               value={field.value}
//               label="First Name"
//               id={field.name}
//               type="text"
//               inputProps={props}
//               error={field.error}
//               disabled
//             />
//           )}
//         </Field>

//         <Field name="lastName">
//           {(field: any, props: any) => (
//             <FormInputField
//               value={field.value}
//               label="Last Name"
//               id={field.name}
//               type="text"
//               inputProps={props}
//               error={field.error}
//               disabled
//             />
//           )}
//         </Field>

//         <Field name="email">
//           {(field: any, props: any) => (
//             <FormInputField
//               value={field.value}
//               label="Email"
//               id={field.name}
//               type="text"
//               inputProps={props}
//               error={field.error}
//             />
//           )}
//         </Field>

//         <Resource
//           value={schoolResource}
//           onPending={() => <SkeletonLoader />}
//           onResolved={(schools: string[]) => (
//             <Field name="school">
//               {(field: any, props: any) => (
//                 <FormComboboxField
//                   label="School"
//                   value={field.value}
//                   id="school"
//                   inputProps={props}
//                   options={schools.map((school) => ({
//                     value: school,
//                     label: school,
//                   }))}
//                   error={field.error}
//                 />
//               )}
//             </Field>
//           )}
//         />

//         <Field name="grade">
//           {(field: any, props: any) => (
//             <FormComboboxField
//               label="Grade"
//               value={field.value}
//               id="grade"
//               inputProps={props}
//               options={grades}
//               error={field.error}
//             />
//           )}
//         </Field>

//         <Field name="classLoad">
//           {(field: any, props: any) => (
//             <FormInputField
//               value={field.value}
//               label="Class Load"
//               id={field.name}
//               type="text"
//               inputProps={props}
//               error={field.error}
//             />
//           )}
//         </Field>
//         <p className="text-sm font-light">
//           This is the current info we have for you, once everything looks
//           correct you can continue on with making your reservation!
//         </p>
//         <div className="flex w-full justify-between">
//           <BaseButton type="button" onClick$={() => onCloseModal$(shopper)}>
//             Update Later
//           </BaseButton>
//           <BaseButton type="submit">Looks Good!</BaseButton>
//         </div>
//       </Form>
//     </Modal>
//   );
// };
