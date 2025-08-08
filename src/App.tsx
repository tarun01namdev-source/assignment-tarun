import React, { useState } from 'react';
import './App.css';
import TagCategoryManager from './components/TagCategory/TagCategoryManager';
import styles from './App.module.scss';

type ViewType = 'home' | 'categories' | 'details' | 'form';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [viewHistory, setViewHistory] = useState<ViewType[]>(['home']);

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    setViewHistory(prev => [...prev, view]);
  };

  const goBack = () => {
    if (viewHistory.length > 1) {
      const newHistory = viewHistory.slice(0, -1);
      const previousView = newHistory[newHistory.length - 1];
      setViewHistory(newHistory);
      setCurrentView(previousView);
    } else {
      // If we're at the root, go to home
      setCurrentView('home');
      setViewHistory(['home']);
    }
  };

  const canGoBack = viewHistory.length > 1;

  return (
    <div className="App">
      <header className="App-header">
        <div className={styles.headerContent}>
          {canGoBack && (
            <button 
              className={styles.backButton}
              onClick={goBack}
              aria-label="Go back"
            >
              ← Back
            </button>
          )}
          <h1>Tag Category Management System</h1>
        </div>
      </header>
      <main>
        {currentView === 'home' && (
          <div className={styles.homeContainer}>
            <div className={styles.welcomeCard}>
              <h2>Welcome to Tag Category Management</h2>
              <p>Manage your tag categories with ease. Create, edit, and organize your metadata configurations.</p>
              <button 
                className={styles.primaryButton}
                onClick={() => navigateTo('categories')}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        {currentView === 'categories' && (
          <TagCategoryManager 
            onNavigate={navigateTo}
            currentView={currentView}
          />
        )}
      </main>
    </div>
  );
}

export default App;
