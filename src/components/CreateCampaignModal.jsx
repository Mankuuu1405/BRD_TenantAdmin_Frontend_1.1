import React, { useState } from 'react';
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const STEPS = ["Details", "Audience", "Content", "Schedule"];

export default function CreateCampaignModal({ isOpen, onClose, defaultChannel }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">
        
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-800">New Campaign</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
              {defaultChannel === 'OVERVIEW' ? 'Select Channel' : `${defaultChannel} Campaign`}
            </p>
          </div>
          <button onClick={onClose}><XMarkIcon className="h-6 w-6 text-slate-400 hover:text-slate-600" /></button>
        </div>

        {/* PROGRESS BAR */}
        <div className="px-8 pt-6">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" 
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} 
            />
            
            {STEPS.map((step, idx) => (
              <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  idx <= currentStep 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-50' 
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {idx < currentStep ? <CheckIcon className="h-4 w-4" /> : idx + 1}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  idx <= currentStep ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="p-8 flex-1 overflow-y-auto">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Campaign Title</label>
                <input type="text" className="w-full p-3 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="e.g. Summer Bonanza Sale" />
              </div>
            </div>
          )}
          
          {currentStep > 0 && (
             <div className="text-center py-10 text-slate-400 italic">
               Step {currentStep + 1}: Configuration UI placeholder...
             </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between">
          <button 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-200 disabled:opacity-50 transition"
          >
            Back
          </button>
          
          <button 
            onClick={() => currentStep === 3 ? onClose() : setCurrentStep(prev => prev + 1)}
            className="px-8 py-2 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition"
          >
            {currentStep === 3 ? "Launch Campaign" : "Next Step"}
          </button>
        </div>

      </div>
    </div>
  );
}
