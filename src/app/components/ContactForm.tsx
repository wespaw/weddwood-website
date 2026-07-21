import { Check } from 'lucide-react';
import { useState } from 'react';

export function ContactForm() {
  const serviceOptions = [
    'Wedding Decoration',
    'Event Planning',
    'Birthday & Private Parties',
    'Roadshows & Brand Events',
    'Gown & Suit Rental',
    'Custom Concept Styling',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    services: [] as string[],
    message: '',
  });
  const [servicesError, setServicesError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.services.length === 0) {
      setServicesError('Please select at least one service.');
      return;
    }

    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', services: [], message: '' });
    setServicesError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((selectedService) => selectedService !== service)
        : [...prev.services, service],
    }));
    setServicesError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-none space-y-8 md:max-w-[535px] lg:mx-0">
      <div className="space-y-2">
        <label className="block font-['Josefin_Sans'] text-xl font-extralight text-black">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b border-[#b8b8b8] bg-transparent py-3 font-['Josefin_Sans'] text-lg font-extralight outline-none transition-colors focus:border-black"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-['Josefin_Sans'] text-xl font-extralight text-black">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-[#b8b8b8] bg-transparent py-3 font-['Josefin_Sans'] text-lg font-extralight outline-none transition-colors focus:border-black"
        />
      </div>

      <fieldset className="space-y-4" aria-describedby={servicesError ? 'services-error' : 'services-hint'}>
        <div>
          <legend className="font-['Josefin_Sans'] text-xl font-extralight text-black">
            Services
          </legend>
          <p id="services-hint" className="mt-1 font-['Josefin_Sans'] text-sm font-extralight text-[#6f675f]">
            Select all that apply
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-7 gap-y-1 sm:grid-cols-2">
          {serviceOptions.map((service) => {
            const isSelected = formData.services.includes(service);

            return (
              <label
                key={service}
                className="group flex cursor-pointer items-center gap-3 border-b border-[#d8d2cb] py-3 font-['Josefin_Sans'] text-[16px] font-extralight text-[#2f2b29] transition-colors hover:border-[#756c64]"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={isSelected}
                  onChange={() => handleServiceChange(service)}
                  className="sr-only"
                />
                <span
                  className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors group-focus-within:ring-2 group-focus-within:ring-[#B78E3F] group-focus-within:ring-offset-2 ${
                    isSelected
                      ? 'border-[#474343] bg-[#474343] text-[#fffaf4]'
                      : 'border-[#a9a099] bg-transparent text-transparent group-hover:border-[#474343]'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="h-3 w-3" strokeWidth={1.8} />
                </span>
                <span>{service}</span>
              </label>
            );
          })}
        </div>
        {servicesError && (
          <p id="services-error" role="alert" className="font-['Josefin_Sans'] text-sm font-light text-[#9b3f35]">
            {servicesError}
          </p>
        )}
      </fieldset>

      <div className="space-y-2">
        <label className="block font-['Josefin_Sans'] text-xl font-extralight text-black">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full resize-none border-b border-[#b8b8b8] bg-transparent py-3 font-['Josefin_Sans'] text-lg font-extralight outline-none transition-colors focus:border-black"
        />
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer bg-[#474343] px-6 py-4 font-['Josefin_Sans'] text-lg font-extralight text-white transition-colors hover:bg-[#5a5454]"
      >
        Send Message
      </button>
    </form>
  );
}