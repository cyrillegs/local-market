import { ProfileDemoForm } from "@/components/profile-demo-form";
import { SiteHeader } from "@/components/site-header";

export default function ProfileDemoPage() {
  return (
    <div className="pb-20">
      <SiteHeader />
      <main className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProfileDemoForm />
      </main>
    </div>
  );
}
