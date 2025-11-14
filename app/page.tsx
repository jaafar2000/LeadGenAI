import {
  Brain,
  Zap,
  Target,
  Search,
  Download,
  Shield,
  Users,
} from "lucide-react";
import Link from "next/link";
export default function LandingPage() {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Type 'cafes in Dubai' or 'gyms in London' and get instant results with address, website, rating, phone, everything.",
    },
    {
      icon: Brain,
      title: "AI Outreach Writer",
      description:
        "Click 'Generate Pitch' on any lead and get a perfect personalized message. Copy. Send. Close.",
    },
    {
      icon: Download,
      title: "Export to CSV",
      description:
        "All your leads, clean and ready for immediate email campaigns or seamless CRM import.",
    },
    {
      icon: Shield,
      title: "Always On Cache",
      description:
        "If real-time search fails, you get instant results from cached datasets. Your app never stops working.",
    },
  ];

  const useCases = [
    "Freelancers looking for clients",
    "Agencies hunting local businesses",
    "Cold-email marketers",
    "Social media managers",
    "Anyone who hates manual research",
  ];

  return (
    // REMOVED 'noto-serif-text' and 'font-["Inter"]' and added the standard 'font-sans'
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 font-sans mt-10">
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-5xl text-center mb-24">
        {/* Header - Branding (Unified Gradient) */}
        <header className="mb-10 flex items-center justify-center space-x-2">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
            LeadGen AI
          </h1>
        </header>

        {/* Headline (Unified Gradient) */}
        <h2 className="text-6xl md:text-8xl  mb-6 leading-none tracking-tighter">
          <span className="text-neutral-50 mr-4">Find leads</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            in seconds
          </span>
        </h2>

        <p className="text-xl md:text-2xl font-medium text-neutral-400 max-w-4xl mx-auto mb-10">
          LeadGen AI pulls real business data, filters it fast, and generates
          perfect outreach messages with one click. Stop scrolling Google Maps
          like a caveman. Start getting clients today.
        </p>

        {/* CTA Buttons (Primary Purple) */}
        <div className="flex justify-center gap-4 flex-wrap">
          {/* Replaced Link with standard <a> tag */}
          <Link href="/start" className="group">
            <button className="flex items-center justify-center px-8 py-3 text-lg font-bold rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-xl shadow-purple-900/50 transform group-hover:scale-105">
              Start Searching <Zap className="w-5 h-5 ml-2" />
            </button>
          </Link>
          {/* Replaced Link with standard <a> tag */}
  
        </div>

  
      </section>

      {/* 2. FEATURES SECTION (Unified Purple Hover) */}
      <section className="w-full max-w-5xl mb-24">
        <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-neutral-200">
          Built for people who actually need leads, not dashboards.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl transition hover:border-purple-500/50 hover:shadow-purple-900/20"
            >
              <feature.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h4 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h4>
              <p className="text-neutral-400 text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. USE CASES SECTION (Unified Purple Accents) */}
      <section className="w-full max-w-5xl mb-24">
        <div className="bg-neutral-800 border border-neutral-700 p-10 rounded-2xl md:flex md:justify-between md:items-start shadow-xl">
          <div className="md:w-1/3 mb-8 md:mb-0">
            {/* Changed from blue-400 to purple-400 */}
            <h4 className="text-3xl font-bold text-purple-400 flex items-center">
              Who uses LeadGen AI? <Users className="w-7 h-7 ml-3" />
            </h4>
          </div>

          <div className="md:w-2/3 md:pl-10">
            <ul className="space-y-3 text-lg text-neutral-300">
              {useCases.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 text-2xl mr-3 leading-none">
                    ✓
                  </span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA (Primary Purple) */}
      <section className="w-full max-w-4xl text-center mb-24">
        <h4 className="text-4xl md:text-5xl font-extrabold text-neutral-200 mb-6 leading-tight">
          Because manual lead generation is slow, boring, and honestly{" "}
          <span className="text-purple-500">a waste of your life.</span>
        </h4>
      

        {/* Replaced Link with standard <a> tag */}
          <Link href="/start" className="group">
          <button className="flex items-center justify-center mx-auto px-10 py-4 text-xl font-black rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-2xl shadow-purple-900/50 transform group-hover:scale-[1.03]">
            Get Leads Now &rarr;
          </button>
        </Link>
      </section>

      {/* 5. Footer (Simple) */}
      <footer className="w-full max-w-4xl text-center border-t border-neutral-800 pt-8 mt-10">
        <p className="text-sm text-neutral-600">
          &copy; {new Date().getFullYear()} LeadGen AI. Built by{" "}
          <span className="font-semibold text-neutral-500">Jaafar</span>.
        </p>
      </footer>
    </div>
  );
}