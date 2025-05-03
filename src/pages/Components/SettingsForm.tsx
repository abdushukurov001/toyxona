import React, { useState } from "react";
import Button from "../../components/ui/Button"; // Update the import path accordingly

interface Settings {
  venueName: string;
  address: string;
  phoneNumber: string;
}

const SettingsForm: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    venueName: "Luxury Venue",
    address: "123 Venue Street, Tashkent",
    phoneNumber: "+998 90 123 45 67",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated settings:", settings);
    // You can implement your save functionality here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To'yxona nomi
        </label>
        <input
          type="text"
          name="venueName"
          value={settings.venueName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Manzil
        </label>
        <input
          type="text"
          name="address"
          value={settings.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          type="text"
          name="phoneNumber"
          value={settings.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <Button type="submit">Saqlash</Button>
    </form>
  );
};

export default SettingsForm;
