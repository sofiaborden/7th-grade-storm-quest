import React, { useState, useEffect } from 'react';
import { Assignment } from '../types';
import { XMarkIcon, CheckIcon, LightningIcon } from './icons';

interface ViewSubjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignments: Assignment[];
  onToggleComplete: (id: string) => void;
}

const ViewSubjectsModal: React.FC<ViewSubjectsModalProps> = ({
  isOpen,
  onClose,
  assignments,
  onToggleComplete,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  if (!isOpen) return null;

  const assignmentsBySubject = assignments.reduce((acc, assignment) => {
    const { subject } = assignment;
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(assignment);
    return acc;
  }, {} as Record<string, Assignment[]>);

  const subjects = Object.keys(assignmentsBySubject).sort();

  // Auto-select first subject on mobile for better UX
  useEffect(() => {
    if (subjects.length > 0 && !selectedSubject) {
      setSelectedSubject(subjects[0]);
    }
  }, [subjects, selectedSubject]);

  // Get weather info for assignment
  const getWeatherForXP = (xp: number) => {
    if (xp <= 10) return { emoji: '☀️', color: 'text-yellow-600 dark:text-yellow-300', description: 'Sunny' };
    if (xp <= 20) return { emoji: '⛅', color: 'text-blue-600 dark:text-blue-300', description: 'Cloudy' };
    if (xp <= 30) return { emoji: '🌧️', color: 'text-indigo-600 dark:text-indigo-300', description: 'Rainy' };
    return { emoji: '⛈️', color: 'text-purple-600 dark:text-purple-300', description: 'Stormy' };
  };

  // Compact assignment item for better mobile experience
  const CompactAssignmentItem: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
    const isCompleted = !!assignment.completionDate;
    const weather = getWeatherForXP(assignment.xp);

    return (
      <div
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-all duration-200 border
          ${isCompleted
            ? 'bg-green-50/80 dark:bg-green-900/20 border-green-200/60 dark:border-green-700/60 opacity-75'
            : 'bg-white/90 dark:bg-slate-800/90 border-slate-200/60 dark:border-slate-600/60 hover:bg-slate-50/90 dark:hover:bg-slate-700/90'
          }
        `}
      >
        <button
          onClick={() => onToggleComplete(assignment.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all duration-200 flex items-center justify-center
            ${isCompleted
              ? 'bg-green-500 border-green-500'
              : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 hover:border-green-400 dark:hover:border-green-400'
            }
          `}
        >
          {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{weather.emoji}</span>
            <p className={`font-semibold text-sm ${isCompleted ? 'line-through text-green-600 dark:text-green-300' : 'text-slate-800 dark:text-slate-100'} truncate`}>
              {assignment.name}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300 font-medium">
              <LightningIcon className="w-3 h-3" />
              +{assignment.xp}
            </span>
            <span className={`${weather.color} font-medium`}>
              {weather.description}
            </span>
            {isCompleted && assignment.completionDate && (
              <span className="text-green-600 dark:text-green-300 font-medium">
                ✓ {new Date(assignment.completionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-slate-200/60 dark:border-slate-600/80"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 sm:p-6 border-b border-slate-200/60 dark:border-slate-600/80 flex items-center justify-between bg-white dark:bg-slate-900 rounded-t-2xl">
          <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 font-orbitron">
            📚 Subject Overview
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile-first layout */}
        <div className="flex-1 overflow-hidden">
          {/* Desktop: Side-by-side layout */}
          <div className="hidden sm:flex h-full">
            {/* Subject list */}
            <div className="w-1/3 border-r border-slate-200/60 dark:border-slate-600/80 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="p-4">
                <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 text-sm uppercase tracking-wide">
                  Subjects ({subjects.length})
                </h3>
                <div className="space-y-2">
                  {subjects.map(subject => {
                    const subjectAssignments = assignmentsBySubject[subject];
                    const completed = subjectAssignments.filter(a => a.completionDate).length;
                    const total = subjectAssignments.length;
                    const isSelected = selectedSubject === subject;

                    return (
                      <button
                        key={subject}
                        onClick={() => setSelectedSubject(subject)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-600'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1">
                          {subject}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {completed}/{total} completed
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Assignment details */}
            <div className="flex-1 overflow-y-auto">
              {selectedSubject ? (
                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4 font-orbitron">
                    {selectedSubject}
                  </h3>
                  <div className="space-y-2">
                    {assignmentsBySubject[selectedSubject]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(assignment => (
                        <CompactAssignmentItem key={assignment.id} assignment={assignment} />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📚</div>
                    <p>Select a subject to view assignments</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Tab-based navigation */}
          <div className="sm:hidden h-full flex flex-col">
            {/* Mobile tab navigation */}
            <div className="flex-shrink-0 p-3 border-b border-slate-200/60 dark:border-slate-600/80 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex gap-1 overflow-x-auto pb-2">
                {subjects.map(subject => {
                  const subjectAssignments = assignmentsBySubject[subject];
                  const completed = subjectAssignments.filter(a => a.completionDate).length;
                  const total = subjectAssignments.length;
                  const isSelected = selectedSubject === subject;

                  return (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-bold">{subject}</div>
                        <div className="text-xs opacity-80">{completed}/{total}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile content area */}
            <div className="flex-1 overflow-y-auto">
              {selectedSubject ? (
                <div className="p-4">
                  {/* Subject header with stats */}
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100 font-orbitron mb-2">
                      {selectedSubject}
                    </h3>
                    {(() => {
                      const subjectAssignments = assignmentsBySubject[selectedSubject];
                      const completed = subjectAssignments.filter(a => a.completionDate).length;
                      const total = subjectAssignments.length;
                      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

                      return (
                        <div className="bg-slate-50/80 dark:bg-slate-800/80 rounded-lg p-3 border border-slate-200/60 dark:border-slate-600/60">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-600 dark:text-slate-300">Progress</span>
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                              {completed}/{total} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Assignment list */}
                  <div className="space-y-2">
                    {assignmentsBySubject[selectedSubject]
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(assignment => (
                        <CompactAssignmentItem key={assignment.id} assignment={assignment} />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400 p-8">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📚</div>
                    <p className="text-lg font-semibold mb-2">Select a Subject</p>
                    <p className="text-sm">Tap any subject tab above to view assignments</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubjectsModal;