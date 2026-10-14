# S1: public product story

Job: inspect the sample recorder and recording workflow. Layout order is the six acts in 01-prd.md. Components: persistent SAMPLE identity; first-HTML product still; decorative canvas; act anchors; annotated native view controls; workflow sequence; return-to-top footer. Exact feature labels use supplied synthetic facts. Stand-in text: “SAMPLE · Procedural recorder illustration”. Primary action: “Inspect controls”. No recording simulator.

States: default still, enhanced canvas ready, failed WebGL retaining still with plain status, selected view, keyboard focus, reduced motion. On phone, stack type/product and keep 44px targets; no sideways gesture or scroll capture. All sections use headings and real anchor destinations. DOM content remains accessible independently of canvas. Footer omits unknown contact and legal links. Story-specific compositions remain unresolved until D5. Controls never assert that actual audio has been recorded, saved or transferred.

## Flow export
- **F1. Exit route:** provide a visible, safe way back or out. Explain saved and unsaved effects. Error and success states have a next step. Leaving a screen does not necessarily cancel its transaction; say what continues and how to recover.
- **F2. Consistency:** use the same names, behavior and component patterns for the same job. Primary action side and button order are decided once in the design system and used the same way across the app. Responsive or platform differences need a documented reason.
- **F3. System status:** show task-relevant progress, results and actionable failures in the user's words. Hide routine system plumbing. Never fake progress or claim work is saved, cancelled or complete without evidence.
