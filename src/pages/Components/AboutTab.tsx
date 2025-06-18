import React, { useEffect, useState } from "react";
import { Edit, X } from "lucide-react";
import client from "../../services";
import Button from "../../components/ui/Button";
import { toast } from "react-toastify";
import AboutUsHighlights from "./AboutHighlightsTab";

interface AboutUs {
  id?: number;
  title: string;
  description: string;
  image: File | string | null;
  main_description: string;
  successful_events: number | string | null;
  work_experience: number;
}

const emptyAbout: AboutUs = {
  title: "",
  description: "",
  image: null,
  main_description: "",
  successful_events: null,
  work_experience: 0,
};

const AboutTab: React.FC = () => {
  const [about, setAbout] = useState<AboutUs>(emptyAbout);
  const [aboutId, setAboutId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get("/api/v1/dashboard/get_all_about_us/");
        console.log("API Response:", res.data); // Debug the response
        if (res.data.length) {
          setAbout(res.data[0]);
          setAboutId(res.data[0].id);
        } else {
          setAbout(emptyAbout);
        }
      } catch (e) {
        toast.error("Maʼlumotni olishda xato");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "work_experience") {
      setAbout((prev) => ({ ...prev, [name]: Number(value) }));
    } else if (name === "successful_events") {
      setAbout((prev) => ({ ...prev, [name]: value || null }));
    } else {
      setAbout((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAbout((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!about.title || !about.description || !about.main_description) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring");
      return;
    }

    try {
      const url = aboutId
        ? `/api/v1/dashboard/update_about_us/${aboutId}/`
        : "/api/v1/dashboard/create_about_us/";

      const method = aboutId ? client.patch : client.post;

      const formData = new FormData();
      formData.append("title", about.title);
      formData.append("description", about.description);
      formData.append("main_description", about.main_description);
      if (about.successful_events !== null) {
        formData.append("successful_events", about.successful_events.toString());
      }
      formData.append("work_experience", about.work_experience.toString());

      if (about.image instanceof File) {
        formData.append("image", about.image);
      } else if (typeof about.image === "string") {
        formData.append("image_url", about.image);
      }

      const res = await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Maʼlumot saqlandi");
      if (!aboutId) setAboutId(res.data.id);
      setEditMode(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Saqlashda xatolik");
      console.error(err.response?.data || err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-600 animate-pulse">Yuklanmoqda...</p>
      </div>
    );
  }

  if (!editMode) {
    return (
      <section className="space-y-8 p-6 bg-white rounded-lg shadow-md">
        <div className="md:flex justify-between items-center">
          <h2 className="text-xl pb-2 md:pb-0 font-serif font-bold text-gray-800">
            Biz haqimizda
          </h2>
          <Button
            onClick={() => setEditMode(true)}
            className="flex items-center bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Edit size={18} className="mr-2" /> Tahrirlash
          </Button>
        </div>

        <article className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarlavha</h3>
            <p className="text-gray-600 leading-relaxed">{about.title || "—"}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Qisqa tavsif</h3>
            <p className="text-gray-600 leading-relaxed">{about.description || "—"}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Asosiy tavsif</h3>
            <p className="text-gray-600 leading-relaxed">{about.main_description || "—"}</p>
          </div>
          {about.image && typeof about.image === "string" && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rasm</h3>
              <img
                src={about.image}
                alt="about"
                className="w-full max-w-lg rounded-lg shadow-md object-cover"
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <StatCard
              value={`${about.work_experience}+`}
              label="Ish tajribasi (yil)"
            />
            <StatCard
              value={`${about.successful_events || 0}`}
              label="Muvaffaqiyatli tadbirlar"
            />
          </div>
        </article>

        <AboutUsHighlights/>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <div className="md:flex justify-between items-center">
        <h2 className="text-xl pb-2 md:pb-0 font-serif font-bold text-gray-800">
          Biz haqimizda — Tahrirlash
        </h2>
        <Button
          type="button"
          onClick={() => setEditMode(false)}
          className="flex items-center bg-gray-500 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <X size={18} className="mr-2" /> Bekor qilish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Sarlavha"
          name="title"
          value={about.title}
          onChange={handleChange}
          required
        />
        <Input
          label="Ish tajribasi (oy)"
          name="work_experience"
          type="number"
          value={about.work_experience.toString()}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Qisqa tavsif"
          name="description"
          value={about.description}
          onChange={handleChange}
          required
        />
        <Textarea
          label="Asosiy tavsif"
          name="main_description"
          value={about.main_description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Rasm tanlash
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
        {about.image && typeof about.image === "string" && (
          <img
            src={about.image}
            alt="Preview"
            className="mt-4 w-full max-w-xs rounded-lg shadow"
          />
        )}
      </div>

      <div>
        <label htmlFor="successful_events" className="block font-medium mb-2 text-gray-700">
          Muvaffaqiyatli tadbirlar
        </label>
        <input
          id="successful_events"
          name="successful_events"
          type="number"
          value={about.successful_events ?? ""}
          onChange={handleChange}
          className="w-full border rounded p-3 focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-lg transition-colors duration-200"
      >
        Saqlash
      </Button>
    </form>
  );
};

const Input = ({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <input
      {...props}
      className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
    />
  </label>
);

const Textarea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <label className="block">
    <span className="text-gray-700 font-medium">{label}</span>
    <textarea
      {...props}
      className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring focus:ring-orange-200 focus:border-orange-500 transition-colors duration-200"
      rows={4}
    />
  </label>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
    <div className="text-3xl font-bold text-orange-400">{value}</div>
    <div className="text-gray-600 mt-1">{label}</div>
  </div>
);

export default AboutTab;