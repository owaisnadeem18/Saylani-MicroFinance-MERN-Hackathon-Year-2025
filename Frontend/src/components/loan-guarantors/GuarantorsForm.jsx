import { userLoanGuarantorFormSchema } from "@/utils/schemas/guarantors/loanGuarantorForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import useLoanGuarantor from "@/hooks/guarantor/useLoanGuarantor";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const GuarantorsForm = () => {

  const { loading, guarantors, addGuarantor } = useLoanGuarantor();

  const params = useParams()

  const id = params?.id

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userLoanGuarantorFormSchema),
  });

  const onSubmit = async (data) => {
    
    const res = await addGuarantor(data , id)
    
    if (res?.success) {
    
      reset();

      console.log("Guarantors added successfully: ", res?.guarantors);  

      console.log("Response message: ", res?.message);

      toast.success(res?.message)

    }

    console.log("Guarantor Form Data: ", data);



  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Guarantor #1 */}
        <div className="border p-6 rounded-lg flex flex-col gap-5 ">
          <h2 className="text-center text-xl font-semibold ">Guarantor #01</h2>

          <div className="flex flex-col gap-5">
            <div className="flex sm:flex-row flex-col items-start gap-5 sm:gap-6 ">
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Name:</Label>
                <Input
                  placeholder="Full Name"
                  {...register("guarantors.0.Name")}
                />
                {errors.guarantors?.[0]?.Name && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[0].Name.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex gap-2 flex-col">
                <Label>CNIC:</Label>
                <Input
                  placeholder="42201-1234567-1"
                  {...register("guarantors.0.CNIC")}
                />
                {errors.guarantors?.[0]?.CNIC && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[0].CNIC.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col items-start gap-5 sm:gap-6">
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Email:</Label>
                <Input
                  placeholder="email@example.com"
                  {...register("guarantors.0.Email")}
                />
                {errors.guarantors?.[0]?.Email && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[0].Email.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Phone:</Label>
                <Input
                  placeholder="03XXXXXXXXX"
                  {...register("guarantors.0.Phone")}
                />
                {errors.guarantors?.[0]?.Phone && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[0].Phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Address:</Label>
              <Textarea
                placeholder="Full address including city & province"
                {...register("guarantors.0.Address")}
              />
              {errors.guarantors?.[0]?.Address && (
                <p className="text-red-500 text-sm">
                  {errors.guarantors[0].Address.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Guarantor #2 */}
        <div className="border p-6 rounded-lg flex flex-col gap-5">
          <h2 className="text-center text-xl font-semibold ">Guarantor #02</h2>

          <div className="flex flex-col gap-5">
            <div className="flex sm:flex-row flex-col items-start gap-6 ">
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Name:</Label>
                <Input
                  placeholder="Full Name"
                  {...register("guarantors.1.Name")}
                />
                {errors.guarantors?.[1]?.Name && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[1].Name.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex gap-2 flex-col">
                <Label>CNIC:</Label>
                <Input
                  placeholder="42201-1234567-1"
                  {...register("guarantors.1.CNIC")}
                />
                {errors.guarantors?.[1]?.CNIC && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[1].CNIC.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex sm:flex-row flex-col items-start gap-6 ">
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Email:</Label>
                <Input
                  placeholder="email@example.com"
                  {...register("guarantors.1.Email")}
                />
                {errors.guarantors?.[1]?.Email && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[1].Email.message}
                  </p>
                )}
              </div>
              <div className="flex-1 flex gap-2 flex-col">
                <Label>Phone:</Label>
                <Input
                  placeholder="03XXXXXXXXX"
                  {...register("guarantors.1.Phone")}
                />
                {errors.guarantors?.[1]?.Phone && (
                  <p className="text-red-500 text-sm">
                    {errors.guarantors[1].Phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Address:</Label>
              <Textarea
                placeholder="Full address including city & province"
                {...register("guarantors.1.Address")}
              />
              {errors.guarantors?.[1]?.Address && (
                <p className="text-red-500 text-sm">
                  {errors.guarantors[1].Address.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center py-6 w-full sm:w-auto">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 w-full sm:w-auto cursor-pointer text-lg"
        >
          Submit Guarantors
        </Button>
      </div>
    </form>
  );
};

export default GuarantorsForm;
