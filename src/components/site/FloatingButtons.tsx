import { MessageCircle, Phone, Send } from "lucide-react";
import { useSiteSettings } from "@/hooks/useContent";
import { telHref, whatsappHref } from "@/lib/seo";

export function FloatingButtons() {
  const { data } = useSiteSettings();
  if (!data) return null;

  const items: { href: string; label: string; Icon: typeof Phone; className: string; show: boolean }[] = [
    {
      show: Boolean(data.show_whatsapp && whatsappHref(data.whatsapp_number || data.phone)),
      href: whatsappHref(data.whatsapp_number || data.phone) ?? "#",
      label: "WhatsApp",
      Icon: MessageCircle,
      className: "bg-[#25D366] text-white",
    },
    {
      show: Boolean(data.show_call && telHref(data.call_button_link || data.phone)),
      href: telHref(data.call_button_link || data.phone) ?? "#",
      label: "Call",
      Icon: Phone,
      className: "bg-primary text-primary-foreground",
    },
    {
      show: Boolean(data.show_telegram && data.telegram_link),
      href: data.telegram_link || "#",
      label: "Telegram",
      Icon: Send,
      className: "bg-[#2AABEE] text-white",
    },
  ];

  const visible = items.filter((i) => i.show);
  if (visible.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {visible.map(({ href, label, Icon, className }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={label}
          className={`grid size-12 place-items-center rounded-full shadow-lg transition-transform hover:scale-105 ${className}`}
        >
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  );
}
