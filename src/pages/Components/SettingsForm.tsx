import React, { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import client from "../../services";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCodeComponent from "./QRCodeComponent";

interface WebSetting {
  id?: number;
  wedding_hall_name: string;
  phone_number: string;
  email: string;
  open_from: string;
  close_to: string;
  location: string;
  location_url: string;
}

const SettingsForm: React.FC = () => {
  const [setting, setSetting] = useState<WebSetting>({
    wedding_hall_name: "",
    phone_number: "",
    email: "",
    open_from: "",
    close_to: "",
    location: "",
    location_url: "",
  });

  const [settingId, setSettingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const res = await client.get("/api/v1/dashboard/get_all_web_settings/");
        if (res.data.length > 0) {
          const data = res.data[0];
          setSetting(data);
          setSettingId(data.id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Ma'lumotlarni olishda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchSetting();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSetting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = settingId
        ? `/api/v1/dashboard/update_web_setting/${settingId}/`
        : "/api/v1/dashboard/create_web_setting/";
      const method = settingId ? client.patch : client.post;
      const response = await method(url, setting);

      toast.success("Muvaffaqiyatli saqlandi!");

      if (!settingId) {
        setSettingId(response.data.id);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Saqlashda xatolik:", error.response?.data || error);
      toast.error("Xatolik yuz berdi. Iltimos, ma'lumotlarni tekshiring.");
    }
  };

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="To'yxona nomi" name="wedding_hall_name" value={setting.wedding_hall_name} onChange={handleChange} />
          <InputField label="Telefon raqam" name="phone_number" value={setting.phone_number} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={setting.email} onChange={handleChange} />
          <InputField label="Ish vaqti (dan)" name="open_from" value={setting.open_from} onChange={handleChange} placeholder="hh:mm:ss" />
          <InputField label="Ish vaqti (gacha)" name="close_to" value={setting.close_to} onChange={handleChange} placeholder="hh:mm:ss" />
          <InputField label="Manzil" name="location" value={setting.location} onChange={handleChange} />
          <InputField label="Manzil (map URL)" name="location_url" value={setting.location_url} onChange={handleChange} />
        </div>
        <div className="text-right">
          <Button type="submit">Saqlash</Button>
        </div>
      </form>
      <QRCodeComponent />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover theme="colored" />
    </>
  );
};

export default SettingsForm;

// Reusable input component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
    />
    <span className="text-red-500 text-xs mt-1 hidden peer-invalid:block">Majburiy</span>
  </div>
);