## Workflow Orchestration\
\
### 1. Plan Mode Default\
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)\
- If something goes sideways, STOP and re-plan immediately\
- Use plan mode for verification steps, not just building\
- Write detailed specs upfront to reduce ambiguity\
\
### 2. Subagent Strategy\
- Use subagents liberally to keep main context window clean\
- Offload research, exploration, and parallel analysis to subagents\
- For complex problems, throw more compute at it via subagents\
- One task per subagent for focused execution\
\
### 3. Self-Improvement Loop\
- After ANY correction from the user: update tasks/lessons.md with the pattern\
- Write rules for yourself that prevent the same mistake\
- Ruthlessly iterate on these lessons until mistake rate drops\
- Review lessons at session start for relevant project\
\
### 4. Verification Before Done\
- Never mark a task complete without proving it works\
- Diff behavior between main and your changes when relevant\
- Ask yourself: "Would a staff engineer approve this?"\
- Run tests, check logs, demonstrate correctness\
\
### 5. Demand Elegance (Balanced)\
- For non-trivial changes: pause and ask "is there a more elegant way?"\
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"\
- Skip this for simple, obvious fixes -- don't over-engineer\
- Challenge your own work before presenting it\
\
### 6. Autonomous Bug Fixing\
- When given a bug report: just fix it. Don't ask for hand-holding\
- Point at logs, errors, failing tests -- then resolve them\
- Zero context switching required from the user\
- Go fix failing CI tests without being told how\
\
## Task Management\
\
1. Plan First: Write plan to tasks/todo.md with checkable items\
2. Verify Plan: Check in before starting implementation\
3. Track Progress: Mark items complete as you go\
4. Explain Changes: High-level summary at each step\
5. Document Results: Add review section to tasks/todo.md\
6. Capture Lessons: Update tasks/lessons.md after corrections\
\
## Core Principles\
\
- Simplicity First: Make every change as simple as possible. Impact minimal code.\
- No Laziness: Find root causes. No temporary fixes. Senior developer standards.\
- Minimal Impact: Only touch what's necessary. No side effects with new bugs.




## Design Context

### Users
**Primary audience:** Recruiters/hiring managers evaluating fit for AI, learning design, and cognitive science roles AND potential collaborators interested in open explorations (DAWK, Weave, Voice as a Thinking Tool). The site must work for both — professional credibility for the first group, creative depth for the second. Recruiters scan quickly in office contexts; collaborators browse more slowly, often evenings.

### Brand Personality
**Calm, precise, understated.** Quiet competence — the work speaks, the presentation stays out of the way. Linus is a cognitive scientist who builds things, produces music, and thinks carefully about how people interact with technology. The site should reflect someone who is thoughtful without being precious, technical without being cold, and creative without being showy.

### Aesthetic Direction
**Tone:** The intersection of a well-run creative studio and an academic research publication. Think Teenage Engineering's restraint meets MIT Media Lab's intellectual density. Precision in typography, generous whitespace, information presented with care.

**Theme:** Both light and dark mode with a toggle. Light as the default (distinctive among dev portfolios, reads well for recruiters). Dark mode available for the music/creative sections and evening browsing.

**Anti-references:**
- No corporate/enterprise sterility (no stock imagery, no LinkedIn energy, no sterile white)
- No overly artistic/abstract treatment (this is still a functional resume — clarity over aesthetics)
- No AI design tells: no glassmorphism, no cyan-on-dark, no neon blue accents, no gradient text, no card-heavy layouts with identical structure

**Accessibility:** Standard basics but not a driving constraint. Focus on design quality.

### Design Principles
1. **Restraint over decoration.** Every visual element must earn its place. No ornament for ornament's sake.
2. **Typography carries the hierarchy.** Use type scale, weight, and spacing to create structure — not borders, cards, or color blocks.
3. **Content density with breathing room.** Present substantive information without overwhelming. The balance point of a well-typeset research paper.
4. **Functional before beautiful.** A recruiter should find what they need in 30 seconds. A collaborator should find depth when they look closer.
5. **Warmth through texture, not color.** Personality comes from typographic choices, subtle tonal shifts, and careful rhythm — not from accent colors or decorative elements.
