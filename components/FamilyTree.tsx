
import React, { useState, useEffect, useRef } from 'react';
import FamilyTree from '@balkangraph/familytree.js';
import { THEME } from '@/themes';
import { ArrowLeft, Loader2, Users, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContentService } from '@/services/contentService';

const FamilyTreePage: React.FC = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTree = async () => {
            try {
                const rawNodes = await ContentService.getFamilyTree();

                // Transform nodes to include lifeDates string
                const nodes = rawNodes.map((node: any) => ({
                    ...node,
                    lifeDates: node.born ? `${node.born} — ${node.died || 'Present'}` : ''
                }));

                if (divRef.current) {
                    const family = new FamilyTree(divRef.current, {
                        nodes: nodes,
                        nodeBinding: {
                            field_0: "name",
                            field_1: "title",
                            field_2: "lifeDates"
                        },
                        template: "hugo",
                        enableSearch: true,
                        nodeMenu: {
                            details: { text: "Details" }
                        },
                        scaleInitial: FamilyTree.match.boundary,
                        mouseScrool: FamilyTree.action.zoom
                    });
                }
            } catch (err) {
                console.error("Failed to load family tree data", err);
            } finally {
                setLoading(false);
            }
        };

        loadTree();
    }, []);

    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 animate-in fade-in duration-700">
            <header className="mb-12">
                <Link to="/" className="flex items-center gap-2 text-[#8c7355]/70 hover:text-accent transition-colors duration-300 group mb-8 inline-flex">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Return to Overview</span>
                </Link>
                <div className="text-center">
                    <h1 className={`text-4xl md:text-5xl font-light italic tracking-tight ${THEME.text.bronze} mb-4 font-display`}>
                        Our Family Tree
                    </h1>
                    <p className="text-sm uppercase tracking-[0.3em] opacity-40 font-medium">Tracing the roots of our story</p>
                    <div className="w-16 h-[1px] bg-[#8c7355]/20 mx-auto mt-8"></div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation Guide */}
                <aside className="lg:col-span-1 space-y-8 animate-in slide-in-from-left duration-700">
                    <div className={`${THEME.bg.card} border ${THEME.border.standard} p-8 rounded-2xl shadow-sm`}>
                        <h2 className={`text-sm font-bold mb-6 font-display ${THEME.text.bronze} uppercase tracking-widest`}>Guide</h2>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-60">Navigate</p>
                                    <p className={`text-xs ${THEME.text.muted} leading-relaxed`}>Click and drag anywhere to move through the tree.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-60">Zoom</p>
                                    <p className={`text-xs ${THEME.text.muted} leading-relaxed`}>Scroll to zoom. Double-click to focus on a person.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Heart className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-60">Discover</p>
                                    <p className={`text-xs ${THEME.text.muted} leading-relaxed`}>Click a node to see life dates and family relations.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 italic">
                        <p className={`text-xs ${THEME.text.muted} leading-relaxed`}>
                            This map represents the love and history that flows through your veins, Gabby.
                        </p>
                    </div>
                </aside>

                {/* Tree Canvas */}
                <div className="lg:col-span-3">
                    <div className={`relative w-full h-[650px] ${THEME.bg.card} border ${THEME.border.stone} rounded-2xl shadow-xl overflow-hidden flex items-center justify-center`}>
                        {loading ? (
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <p className="font-display italic text-lg opacity-60">Opening the archive...</p>
                            </div>
                        ) : (
                            <div ref={divRef} id="tree" className="w-full h-full" />
                        )}

                        {/* Visual Decorative Overlay */}
                        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            <p className={`mt-12 text-center text-xs ${THEME.text.muted} italic max-w-2xl mx-auto leading-relaxed`}>
                "The family is one of nature's masterpieces."
            </p>
        </main>
    );
};

export default FamilyTreePage;
