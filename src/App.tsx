import { useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { BrandFooter } from './components/BrandFooter';
import { BrandHeader } from './components/BrandHeader';
import { LandingView } from './components/LandingView';
import { ThankYouView } from './components/ThankYouView';

export default function App() {
  const [view, setView] = useState<'landing' | 'thankyou'>('landing');
  const [firstName, setFirstName] = useState('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSuccess = (submittedFirstName: string) => {
    setFirstName(submittedFirstName);
    setView('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFocusForm = () => {
    const card = document.getElementById('register-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 300);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-[#FAFAFA]">
        <BrandHeader
          view={view}
          onReturnHome={handleReturnHome}
          onFocusForm={handleFocusForm}
        />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {view === 'landing' ? (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <LandingView onSuccess={handleSuccess} nameInputRef={nameInputRef} />
              </motion.div>
            ) : (
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <ThankYouView firstName={firstName} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <BrandFooter />
      </div>
    </MotionConfig>
  );
}
