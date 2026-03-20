// Root / — middleware redirects to the detected locale (/en or /bs).
// This is a safety fallback for any direct root access that bypasses middleware.
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
