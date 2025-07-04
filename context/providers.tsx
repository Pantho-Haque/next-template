import { NextIntlClientProvider } from "next-intl";
import { NotificationProvider } from "./notifyContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </NextIntlClientProvider>
  );
}
