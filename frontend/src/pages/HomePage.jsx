import HeroSection from "../components/HomePageComponents/HeroSection";
import IntroVideoSection from "../components/HomePageComponents/IntroVideoSection";
import WhyToLearnSection from "../components/HomePageComponents/WhyToLearnSection";
import TopCoursesSection from "../components/HomePageComponents/TopCoursesSection";
import Testimonials from "../components/HomePageComponents/Testimonials";
import JoinCommunitySection from "../components/HomePageComponents/JoinCommunitySection";
function HomePage() {
  return (
    <div className="min-h-screen bg-[#151515] text-gray-200 font-sans selection:bg-blue-600 selection:text-white">
      <HeroSection />
      <IntroVideoSection />
      <WhyToLearnSection />
      <TopCoursesSection />
      <Testimonials />
      <JoinCommunitySection />
    </div>
  );
}

export default HomePage