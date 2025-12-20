// src/app/api/booking/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Honeypot: if "website" has a value, likely a bot
    if (data.website) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Minimal validation
    const errors = [];
    if (!data.enquiry?.name) errors.push("Name is required");
    if (!data.enquiry?.email || !isEmail(data.enquiry.email)) errors.push("Valid email is required");
    if (!data.enquiry?.phone) errors.push("Phone is required");
    if (!data.taster?.date) errors.push("Taster date is required");
    if (!data.taster?.time) errors.push("Taster time is required");

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Build email content
    const emailBody = `
New Booking Request from Wellvitas Website

CUSTOMER DETAILS:
- Name: ${data.enquiry.name}
- Email: ${data.enquiry.email}
- Phone: ${data.enquiry.phone}
- Preferred Contact: ${data.enquiry.preferredContact}

THERAPIES OF INTEREST:
${data.enquiry.therapies.length ? data.enquiry.therapies.join(", ") : "To be confirmed"}

HEALTH SCREENING:
- Conditions: ${data.screening.conditions.length ? data.screening.conditions.join(", ") : "None specified"}
${data.screening.notes ? `- Notes: ${data.screening.notes}` : ""}

TASTER APPOINTMENT:
- Date: ${data.taster.date}
- Time: ${data.taster.time}

PROGRAMME SELECTION:
- Package: ${data.programme.package === "taster" ? "Taster only" : `${data.programme.package} sessions`}
- Payment: ${data.programme.payment === "payg" ? "Pay-as-you-go" : "Installment plan"}

SUBMISSION INFO:
- Submitted: ${data.meta.submittedAt}
- User Agent: ${data.meta.ua || "N/A"}
    `.trim();

    // ====================================
    // EMAIL CONFIGURATION
    // ====================================
    // FOR LOCALHOST: Use Resend test domain
    // FOR PRODUCTION: Change to "Wellvitas Bookings <bookings@wellvitas.co.uk>"
    const fromEmail = "onboarding@resend.dev";
    
    // Company email - receives booking notifications
    const companyEmail = "info@wellvitas.co.uk";

    // Send notification email to company
    await resend.emails.send({
      from: fromEmail,
      to: [companyEmail],
      replyTo: data.enquiry.email,
      subject: `New Booking: ${data.enquiry.name} - ${data.taster.date} ${data.taster.time}`,
      text: emailBody,
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: fromEmail,
      to: [data.enquiry.email],
      subject: "Booking Confirmation - Wellvitas",
      text: `
Hello ${data.enquiry.name},

Thank you for booking with Wellvitas! We've received your request for a free taster session.

Your Appointment:
- Date: ${data.taster.date}
- Time: ${data.taster.time}
- Location: 1620 Great Western Rd, Anniesland, Glasgow G13 1HH

We'll confirm your appointment shortly via ${data.enquiry.preferredContact}.

If you have any questions, feel free to reach out:
- WhatsApp: +44 7379 005856
- Email: info@wellvitas.co.uk

Looking forward to seeing you!

Best regards,
Wellvitas Team
      `.trim(),
    });

    console.log("[Booking] Emails sent successfully");
    console.log("- Notification sent to:", companyEmail);
    console.log("- Confirmation sent to:", data.enquiry.email);
    
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[Booking] Error:", e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}