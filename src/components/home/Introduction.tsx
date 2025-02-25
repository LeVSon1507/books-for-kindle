import { APP_COLOR } from "@/utils/constants";

export const Introduction = () => {
  return (
    <section className="py-20 text-center">
      <h1
        className={`text-4xl text-[${APP_COLOR}] font-bold tracking-tight mb-4`}
      >
        Unlock a World of Stories, Instantly.
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Dive into your next literary adventure with our vast, free Kindle
        library. Download in .epub or send directly to your Kindle for
        effortless reading. Your favorite books, just a click away.
      </p>
    </section>
  );
};
