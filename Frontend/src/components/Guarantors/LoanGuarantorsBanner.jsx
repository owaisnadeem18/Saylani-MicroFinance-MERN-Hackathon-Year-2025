import React from "react";
import { Badge } from "../ui/badge";

const LoanGuarantorsBanner = () => {
  return (
    <div className="py-12" >
    <div className="bg-blue-50 flex flex-col gap-5 rounded-xl shadow-md p-8 text-center max-w-4xl mx-auto ">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-blue-700">
        Step 2: Guarantor Details
      </h1>

      {/* Description */}
      <p className="text-gray-700 text-lg">
        To complete your loan application, please provide details of <strong>two trustworthy guarantors</strong>.
        This ensures responsibility and trust, aligning with ethical and Islamic financial practices.
      </p>

      {/* Sample Guarantor Fields Info (Illustrative) */}
      <div className="bg-white flex flex-col gap-3 p-4 rounded-lg shadow-sm">
        <p className="text-gray-800 font-medium">Each guarantor should provide:</p>
        <div className="list-disc list-inside text-gray-700 flex gap-4 justify-center items-center flex-wrap" >
          <Badge>Full Name</Badge>
          <Badge>CNIC</Badge>
          <Badge>Email Address</Badge>
          <Badge>Phone Number</Badge>
          <Badge>Address</Badge>
        </div>
      </div>

      {/* Hadith Banner */}
      <div className="bg-green-100 flex flex-col gap-3 border-l-4 border-green-500 p-4 rounded-lg">
        <p className="text-xl font-semibold text-green-700">حدیثِ مبارک</p>
        <p className="text-gray-800 text-lg">اَلزَّعِيمُ غَارِمٌ</p>
        <p className="text-gray-700">
          ضامن اپنی ضمانت کی ذمہ داری اٹھاتا ہے۔  
          <span className="italic">— سنن ابو داؤد، حدیث 3561</span>
        </p>
      </div>
    </div>

    </div>
  );
};

export default LoanGuarantorsBanner;
