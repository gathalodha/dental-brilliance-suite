import { describe, expect, it } from "vitest";
import { telHref, whatsappHref, WHATSAPP_BOOKING_MESSAGE } from "./seo";

describe("contact links", () => {
  it("formats a 10-digit number as an Indian tel link", () => {
    expect(telHref("9209429989")).toBe("tel:+919209429989");
  });
  it("opens WhatsApp with country code and the booking template", () => {
    expect(whatsappHref("9209429989")).toBe(
      `https://wa.me/919209429989?text=${encodeURIComponent(WHATSAPP_BOOKING_MESSAGE)}`,
    );
    expect(WHATSAPP_BOOKING_MESSAGE).toBe("Info to book an appointment\n\nName :\nAge :\nTreatment :\nPhone no:\nDate:\nTime:");
  });
});
