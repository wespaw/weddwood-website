import { useState } from 'react';

export function ContactForm() {
  const serviceOptions = [
    'Wedding Decoration',
    'Event Planning',
    'Birthday & Private Parties',
    'Roadshows & Brand Events',
    'Gown & Suit Rental',
    'Custom Concept Styling'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', service: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-none space-y-8 md:max-w-[535px] lg:mx-0">
      <div className="space-y-2">
        <label className="font-['Josefin_Sans'] font-extralight text-xl text-black block">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b border-[#b8b8b8] py-3 bg-transparent outline-none font-['Josefin_Sans'] font-extralight text-lg focus:border-black transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-['Josefin_Sans'] font-extralight text-xl text-black block">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-[#b8b8b8] py-3 bg-transparent outline-none font-['Josefin_Sans'] font-extralight text-lg focus:border-black transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-['Josefin_Sans'] font-extralight text-xl text-black block">
          Service
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full border-b border-[#b8b8b8] py-3 bg-transparent outline-none font-['Josefin_Sans'] font-extralight text-lg focus:border-black transition-colors"
        >
          <option value="" disabled>
            Select a service
          </option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-['Josefin_Sans'] font-extralight text-xl text-black block">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border-b border-[#b8b8b8] py-3 bg-transparent outline-none font-['Josefin_Sans'] font-extralight text-lg focus:border-black transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="cursor-pointer w-full bg-[#474343] text-white py-4 px-6 font-['Josefin_Sans'] font-extralight text-lg hover:bg-[#5a5454] transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
