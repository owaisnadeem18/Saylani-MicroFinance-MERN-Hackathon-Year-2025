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
import { Link } from "react-router-dom";
import { scrollToTop } from "@/utils/scrollToTop";

const LoanCard = ({ category, subcategories, description, maxLoan, loanPeriod }) => {
  return (
    <Card className="flex flex-col justify-between transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl overflow-hidden border border-gray-200 min-h-80">
      {/* Card Header */}
      <CardHeader className="bg-blue-50 p-4">
        <CardTitle className="text-lg font-bold text-blue-700">{category} Loan</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <strong className="text-gray-700">Subcategories:</strong>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((subCategory, index) => (
                <Badge key={index} variant="secondary">
                  {subCategory}
                </Badge>
              ))}
            </div>
          </div>

              <div className="flex flex-col gap-2" >

          <div>
            <strong className="text-gray-700">Maximum Loan:</strong>{" "}
            <span className="text-blue-800 font-bold">{maxLoan}</span>
          </div>
          <div className="flex gap-2 items-center" >
            <strong className="text-gray-700">Loan Period:</strong>{" "}
            <Badge className="text-gray-200 font-bold">{loanPeriod}</Badge>
          </div>
              </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex justify-center mt-auto">
        <Link onClick={() => scrollToTop()} to="/apply-for-loan"> 
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-2 rounded-full shadow-md cursor-pointer w-full sm:w-auto">
                Apply Now
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoanCard;
