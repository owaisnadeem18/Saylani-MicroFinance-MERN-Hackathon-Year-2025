import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const LoanCard = ({ category, subcategories, description, maxLoan, loanPeriod }) => {
  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden border border-gray-200 min-h-80">
      {/* Card Header */}
      <CardHeader className="bg-blue-50 p-4">
        <CardTitle className="text-lg font-bold text-blue-700">{category} Loan</CardTitle>
        <CardDescription className="text-gray-600 mt-1">{description}</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="mb-3">
          <p className="flex flex-col items-start gap-2">
            <strong className="text-gray-700 mb-1">Subcategories:</strong>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((subCategory, index) => (
                <Badge key={index} variant="secondary">
                  {subCategory}
                </Badge>
              ))}
            </div>
          </p>

          <p className="mt-3">
            <strong className="text-gray-700">Maximum Loan:</strong>{" "}
            <span className="text-gray-900 font-semibold">{maxLoan}</span>
          </p>
          <p>
            <strong className="text-gray-700">Loan Period:</strong>{" "}
            <span className="text-gray-900 font-semibold">{loanPeriod}</span>
          </p>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex justify-center mt-auto">
        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-2 rounded-full shadow-md cursor-pointer w-full sm:w-auto">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
