'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SafetyLogEntry {
  id: string;
  timestamp: string;
  robot: string;
  status: 'safe' | 'warning' | 'unsafe';
  confidence: number;
  summary: string;
  concerns: string[];
  recommendations: string[];
}

interface SafetyLogContextType {
  logEntries: SafetyLogEntry[];
  addLogEntry: (entry: Omit<SafetyLogEntry, 'id' | 'timestamp'>) => void;
  clearLog: () => void;
}

const SafetyLogContext = createContext<SafetyLogContextType | undefined>(undefined);

const STORAGE_KEY = 'paio-incident-log';

export function SafetyLogProvider({ children }: { children: ReactNode }) {
  const [logEntries, setLogEntries] = useState<SafetyLogEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLogEntries(parsed);
      }
    } catch (error) {
      console.error('Error loading incident log from localStorage:', error);
    }
  }, []);

  // Save to localStorage when entries change
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logEntries));
      } catch (error) {
        console.error('Error saving incident log to localStorage:', error);
      }
    }
  }, [logEntries, isClient]);

  const addLogEntry = (entry: Omit<SafetyLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: SafetyLogEntry = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    setLogEntries((prev) => [newEntry, ...prev]); // Add to beginning for reverse chronological order
  };

  const clearLog = () => {
    setLogEntries([]);
  };

  return (
    <SafetyLogContext.Provider value={{ logEntries, addLogEntry, clearLog }}>
      {children}
    </SafetyLogContext.Provider>
  );
}

export function useSafetyLog() {
  const context = useContext(SafetyLogContext);
  if (context === undefined) {
    throw new Error('useSafetyLog must be used within a SafetyLogProvider');
  }
  return context;
}
