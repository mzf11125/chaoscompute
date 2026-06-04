import { HeroSection } from './HeroSection'
import { HowItWorks } from './HowItWorks'
import { SecuritySection } from './SecuritySection'
import { Competitors } from './Competitors'
import { CodeExample } from './CodeExample'
import { CommunitySection } from './CommunitySection'

export default function Landing() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <SecuritySection />
      <Competitors />
      <CodeExample />
      <CommunitySection />
    </>
  )
}
