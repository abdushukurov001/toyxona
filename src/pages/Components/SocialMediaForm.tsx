import React, { useState } from "react";
import Button from "../../components/ui/Button"; // Update the import path accordingly

interface SocialMediaLinks {
  instagram: string;
  facebook: string;
  telegram: string;
}

const SocialMediaForm: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>({
    instagram: "",
    facebook: "",
    telegram: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Social media links:", socialLinks);
    // You can implement your save functionality here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(socialLinks).map((platform) => (
        <div key={platform}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </label>
          <input
            type="text"
            name={platform}
            value={socialLinks[platform as keyof SocialMediaLinks]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder={`https://${platform}.com/username`}
          />
        </div>
      ))}
      <Button type="submit">Saqlash</Button>
    </form>
  );
};

export default SocialMediaForm;
