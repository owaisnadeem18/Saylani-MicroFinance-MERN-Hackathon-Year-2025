import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetUserLoans from "@/hooks/loan/useGetUserLoans";
import { useParams } from "react-router-dom";
import { Spinner } from "../ui/spinner";

const UserLoanApplications = () => {

  // Now, we have to call the custom hook to get loans applied by user:
  
  const params = useParams()

  const id = params.id

  const {loading , loans} = useGetUserLoans(id)

  const statusStyles = {
    pending: "bg-yellow-500 text-white",
    approved: "bg-green-500 text-white",
    rejected: "bg-red-500 text-white",
  };

  return (
    <div className="container mx-auto max-w-7xl px-10 py-12">
 <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            My Loan Applications
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            {loans.length > 0 &&
            <TableCaption>
              List of all loan applications submitted by you
            </TableCaption>
            }

            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Sub Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Token #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {
                loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10" >
                      <div className="flex items-center justify-center" >

                      <Spinner />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : 

                  loans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-5 font-semibold" >
                      You have not applied for any loans yet.
                    </TableCell>
                  </TableRow>
                ) :

                 loans?.map((loan) => (
                <TableRow key={loan._id}>
                  <TableCell className="font-medium">{loan.category}</TableCell>

                  <TableCell>{loan.subcategory}</TableCell>

                  <TableCell>Rs. {loan.loanAmount.toLocaleString()}</TableCell>

                  <TableCell>{loan.loanPeriod} Years</TableCell>

                  <TableCell>{loan.tokenNumber}</TableCell>

                  <TableCell>
                    {new Date(loan.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        loan.status === "approved"
                          ? "success"
                          : loan.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className={
                        statusStyles[loan.status] || "bg-gray-500 text-white"
                      }
                    >
                      {loan.status.charAt(0).toUpperCase() +
                        loan.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
              }
            

            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
};

export default UserLoanApplications;
