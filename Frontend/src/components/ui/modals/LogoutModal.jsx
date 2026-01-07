import React from "react";
import { Button } from "../button";
import { LogOutIcon } from "lucide-react";

const LogoutModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg max-w-sm p-8 flex flex-col gap-4 mx-4">

        <div className="bg-blue-600 flex justify-center p-5 w-fit mx-auto rounded-full" >
          <LogOutIcon className="w-8 h-auto" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Logout!
        </h2>

        <p className="text-gray-600 text-center">
          Are you sure you want to logout from the admin panel?
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant = "secondary"
            onClick={onClose}
           className="cursor-pointer bg-blue-600 text-white hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-md px-4 py-2"

          >
            Cancel
          </Button>

          <Button
            variant = "destructive"
            className="cursor-pointer"
            onClick={onConfirm}
          >
            Logout
          </Button>
        </div>

      </div>
    </div>
  );
};

export default LogoutModal;