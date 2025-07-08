import React from 'react';
import { Assignment } from '../types';
import AssignmentCard from './AssignmentCard';
import { XMarkIcon } from './icons';

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

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white/98 dark:bg-slate-900/98 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] flex flex-col border border-slate-200/60 dark:border-slate-600/80 backdrop-blur-xl"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 sm:p-6 border-b border-slate-200/60 dark:border-slate-600/80 flex items-center justify-between sticky top-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl rounded-t-2xl sm:rounded-t-3xl">
          <h2 id="modal-title" className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 font-orbitron uppercase">
            📚 Subject Logs
          </h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 rounded-xl text-slate-500 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </header>

        <div className="overflow-y-auto p-3 sm:p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {subjects.map(subject => (
              <div key={subject} className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-slate-700 dark:text-slate-100 mb-3 font-orbitron truncate">{subject}</h3>
                <div className="space-y-3">
                    {assignmentsBySubject[subject]
                        .sort((a,b) => a.name.localeCompare(b.name))
                        .map(assignment => (
                        <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            onToggleComplete={onToggleComplete}
                        />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSubjectsModal;