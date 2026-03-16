
"use client";

import { useState } from "react";
import { generateProjectDescription, ProjectDescriptionInput } from "@/ai/flows/ai-project-description-generator-flow";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProjectGenPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<ProjectDescriptionInput>({
    projectName: "",
    projectType: "Web Application",
    technologiesUsed: [],
    keyFeatures: [],
    projectGoal: "",
  });

  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectName) {
      toast({ title: "Error", description: "Project name is required", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const output = await generateProjectDescription(formData);
      setResult(output.description);
    } catch (err) {
      toast({ title: "Error", description: "Failed to generate description", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData(prev => ({ ...prev, technologiesUsed: [...prev.technologiesUsed, techInput.trim()] }));
      setTechInput("");
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, featureInput.trim()] }));
      setFeatureInput("");
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Success", description: "Copied to clipboard" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <header>
          <h1 className="text-4xl font-bold gradient-text mb-4">Project AI Generator</h1>
          <p className="text-muted-foreground">Internal tool for Sharukh H to generate compelling portfolio content.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <section className="glass-card p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="text-primary" size={20} /> Project Details
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project Name</label>
                <input
                  value={formData.projectName}
                  onChange={e => setFormData(p => ({ ...p, projectName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50"
                  placeholder="e.g. Synapse Studio"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={e => setFormData(p => ({ ...p, projectType: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary/50"
                >
                  <option>Web Application</option>
                  <option>Mobile App</option>
                  <option>AI/ML Project</option>
                  <option>Design Concept</option>
                  <option>Branding</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Technologies</label>
                <div className="flex gap-2">
                  <input
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                    placeholder="React, GSAP..."
                  />
                  <button type="button" onClick={addTech} className="px-4 bg-primary rounded-lg font-bold">+</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologiesUsed.map(t => (
                    <span key={t} className="px-2 py-1 bg-white/10 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Key Features</label>
                <div className="flex gap-2">
                  <input
                    value={featureInput}
                    onChange={e => setFeatureInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                    placeholder="Smooth scrolling..."
                  />
                  <button type="button" onClick={addFeature} className="px-4 bg-primary rounded-lg font-bold">+</button>
                </div>
                <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-muted-foreground">
                  {formData.keyFeatures.map(f => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              <button
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Generate Description"}
              </button>
            </form>
          </section>

          {/* Output */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Output</h2>
            <div className="glass-card min-h-[300px] p-8 flex flex-col justify-between">
              {result ? (
                <>
                  <p className="text-lg leading-relaxed italic">{result}</p>
                  <button
                    onClick={copyToClipboard}
                    className="mt-8 flex items-center gap-2 text-sm text-primary font-bold hover:underline"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </button>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center">
                  <Sparkles size={40} className="mb-4 opacity-20" />
                  <p>Your AI-powered description will appear here.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
