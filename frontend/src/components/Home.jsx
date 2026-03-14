// pages/Home.jsx
// Landing page — imports each section as its own component.
// Add <Home /> as your "/" route in your router.

import HeroSection from "./landing/HeroSection";
import AboutSection    from "./landing/AboutSection";
import FeaturesSection from "./landing/FeaturesSection";
import WorkflowSection from "./landing/WorkflowSection";
import AISection       from "./landing/AISection";
import FAQSection      from "./landing/FAQSection";
import FooterSection   from "./landing/FooterSection";

export default function Home() {
  return (
    <div style={{ background: "#060e18", overflowX: "hidden" }}>
      <HeroSection/>
      <AboutSection/>
      <FeaturesSection/>
      <WorkflowSection/>
      {/*<AISection/>*/}
      <FAQSection/>
      <FooterSection/>
    </div>
  );
}
