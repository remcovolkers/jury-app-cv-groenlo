import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CategoryPage } from './CategoryPage';
import { VotePage } from './VotePage';
import { ExportPage } from './ExportPage';

// Infrastructure
import { StaticAuthService } from '../../../infrastructure/auth/StaticAuthService';
import { StaticParticipantRepository } from '../../../infrastructure/persistence/StaticParticipantRepository';
import { LocalStorageVoteRepository } from '../../../infrastructure/persistence/LocalStorageVoteRepository';

// Use Cases
import { LoginJury } from '../../../application/use-cases/LoginJury';
import { GetJuryDashboard } from '../../../application/use-cases/GetJuryDashboard';
import { GetParticipants, ParticipantWithVote } from '../../../application/use-cases/GetParticipants';
import { SubmitVote } from '../../../application/use-cases/SubmitVote';
import { ExportVotes } from '../../../application/use-cases/ExportVotes';

// --- DEPENDENCY INJECTION ---
const authService = new StaticAuthService();
const participantRepo = new StaticParticipantRepository(authService);
const voteRepo = new LocalStorageVoteRepository();

const loginJury = new LoginJury(authService);
const getDashboard = new GetJuryDashboard(participantRepo, voteRepo);
const getParticipants = new GetParticipants(participantRepo, voteRepo);
const submitVote = new SubmitVote(voteRepo);
const exportVotes = new ExportVotes(voteRepo);

type ViewState = 'login' | 'dashboard' | 'category' | 'vote' | 'export';

function App() {
  const [view, setView] = useState<ViewState>('login');
  const [juryCode, setJuryCode] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeParticipant, setActiveParticipant] = useState<ParticipantWithVote | null>(null);

  // Restore session
  useEffect(() => {
    const savedCode = localStorage.getItem('jury_code_v2');
    if (savedCode) {
      // Validate if code is still valid (optional, but good practice)
      loginJury.execute(savedCode).then(isValid => {
        if (isValid) {
          setJuryCode(savedCode);
          setView('dashboard');
        }
      });
    }
  }, []);

  // Browser back button handling
  useEffect(() => {
    const handlePopState = () => {
      // Handle back navigation based on current view
      if (view === 'vote') {
        setActiveParticipant(null);
        setView('category');
      } else if (view === 'category') {
        setActiveCategory(null);
        setView('dashboard');
      } else if (view === 'export') {
        setView('dashboard');
      } else if (view === 'dashboard') {
        // At dashboard, we could logout or do nothing
        // For now, do nothing (prevents accidental exit)
      }
    };

    // Push a state when view changes (except login)
    if (view !== 'login') {
      window.history.pushState({ view }, '');
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [view]);

  const handleLoginSuccess = (code: string) => {
    setJuryCode(code);
    localStorage.setItem('jury_code_v2', code);
    setView('dashboard');
  };

  const handleLogout = () => {
    if (window.confirm("Uitloggen?")) {
      setJuryCode(null);
      localStorage.removeItem('jury_code_v2');
      setView('login');
    }
  };

  const handleCategorySelect = (catId: string) => {
    setActiveCategory(catId);
    setView('category');
  };

  const handleParticipantSelect = (participant: ParticipantWithVote) => {
    setActiveParticipant(participant);
    setView('vote');
  };

  const handleVoteSaved = () => {
    // Show toast or something?
    // For now just go back to category
    setView('category');
    setActiveParticipant(null);
  };

  const handleReset = () => {
    setJuryCode(null);
    localStorage.removeItem('jury_code_v2');
    setView('login');
  }

  return (
    <Layout>
      {view === 'login' && (
        <LoginPage loginJury={loginJury} onLoginSuccess={handleLoginSuccess} />
      )}

      {view === 'dashboard' && juryCode && (
        <DashboardPage
          juryCode={juryCode}
          getDashboard={getDashboard}
          onLogout={handleLogout}
          onSelectCategory={handleCategorySelect}
          onExport={() => setView('export')}
        />
      )}

      {view === 'category' && juryCode && activeCategory && (
        <CategoryPage
          juryCode={juryCode}
          categoryId={activeCategory}
          getParticipants={getParticipants}
          onBack={() => {
            setActiveCategory(null);
            setView('dashboard');
          }}
          onSelectParticipant={handleParticipantSelect}
        />
      )}

      {view === 'vote' && juryCode && activeParticipant && (
        <VotePage
          juryCode={juryCode}
          participant={activeParticipant}
          submitVote={submitVote}
          onBack={() => {
            setActiveParticipant(null);
            setView('category');
          }}
          onVoteSaved={handleVoteSaved}
        />
      )}

      {view === 'export' && juryCode && (
        <ExportPage
          juryCode={juryCode}
          exportVotes={exportVotes}
          onBack={() => setView('dashboard')}
          onReset={handleReset}
        />
      )}
    </Layout>
  );
}

export default App;
