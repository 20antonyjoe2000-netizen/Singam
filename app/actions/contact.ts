"use server"

export type ContactResult =
  | { success: true }
  | { success: false; error: string }

export async function submitContact(
  formData: FormData
): Promise<ContactResult> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const goal = String(formData.get("goal") ?? "").trim()
  const msg = String(formData.get("msg") ?? "").trim()

  if (!name) {
    return { success: false, error: "Name is required." }
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "A valid email address is required." }
  }

  // Wire an email service here when ready, e.g.:
  // await resend.emails.send({ from: "...", to: "hello@singamacademy.com",
  //   subject: `New enquiry from ${name}`, text: `Goal: ${goal}\n\n${msg}` })

  console.log("Contact form submission:", { name, email, goal, msg })

  return { success: true }
}
