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
      className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-slate-100 dark:bg-slate-950 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border-2 border-slate-300 dark:border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-slate-100/80 dark:bg-slate-950/80 backdrop-blur-sm">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800 dark:text-cyan-400 font-orbitron uppercase">
            Subject Logs
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map(subject => (
              <div key={subject}>
                <h3 className="font-bold text-lg text-slate-700 dark:text-slate-200 mb-3 font-orbitron">{subject}</h3>
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