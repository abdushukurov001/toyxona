// components/staff/DeleteStaffButton.tsx
import React from "react";
import { Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import client from "../../../services";

interface DeleteStaffButtonProps {
  id: number;
  onDeleted: () => void;
}

const DeleteStaffButton: React.FC<DeleteStaffButtonProps> = ({ id, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await client.delete(`/api/v1/dashboard/delete_our_team/${id}/`);
      onDeleted(); // ro'yxatni yangilash uchun
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    }
  };

  return (
    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600" onClick={handleDelete}>
      <Trash2 size={14} className="mr-1" />
      O'chirish
    </Button>
  );
};

export default DeleteStaffButton;
