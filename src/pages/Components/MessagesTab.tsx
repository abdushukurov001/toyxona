import { Trash2 } from "lucide-react";
import Button from "../../components/ui/Button"; // or the correct import path
import React from "react";

interface Message {
  date: string;
  name: string;
  phone: string;
  message: string;
  status: string;
}

interface MessagesTabProps {
  messages: Message[];
  onDeleteMessage: (index: number) => void;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ messages, onDeleteMessage }) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-6">Xabarlar</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Sana</th>
              <th className="px-4 py-2 text-left">Ism</th>
              <th className="px-4 py-2 text-left">Telefon</th>
              <th className="px-4 py-2 text-left">Xabar</th>
              <th className="px-4 py-2 text-left">Holat</th>
              <th className="px-4 py-2 text-left">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr className="border-t" key={index}>
                <td className="px-4 py-2">{message.date}</td>
                <td className="px-4 py-2">{message.name}</td>
                <td className="px-4 py-2">{message.phone}</td>
                <td className="px-4 py-2">{message.message}</td>
                <td className="px-4 py-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    {message.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => onDeleteMessage(index)}
                  >
                    <Trash2 size={14} className="mr-1" />
                    O'chirish
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesTab;
