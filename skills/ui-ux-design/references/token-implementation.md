# Token implementation

Load for a token-to-code mapping, format check or authorized affected migration. Inspect the canonical source, consumers, generated outputs, actual framework/tool versions and build commands first. Do not replace the project's existing system or require new tooling.

## Map without forking the source

| Project uses | Keep |
| --- | --- |
| CSS variables | Existing names, semantic aliases, selectors and cascade. Raw values stay in canonical definitions; consumers use those variables. Check missing variables and computed styles in supported contexts. |
| Tailwind | The installed version's existing theme/config mapping and approved utilities. v3 commonly uses config mappings; v4 uses CSS theme variables. Preserve semantic CSS-variable references where supported; inspect namespace, inline/reference resolution and utility output rather than pasting another version's recipe. |
| Another system | Its native token API, design variables or Sass/JS theme and actual supported roles. Do not introduce duplicate CSS names or a new palette because the framework differs. |
| Generated tokens | Canonical input -> existing transform/config -> generated target -> consumer. Change the authorized source, regenerate through the real command and inspect outputs; do not hand-edit generated files as the fix. Missing configuration/commands stay Unknown. |

Treat Style Dictionary and Tokens Studio as optional existing or approved tools. Inspect their installed versions, legacy versus DTCG input, token types, transforms, references and output support. Do not claim conversion is lossless merely because keys gain a dollar prefix.

## Format and reference checks

DTCG 2025.10 describes interchange; it does not require a three-layer naming scheme, universal default palette or replacement of native tokens. If DTCG export is actually needed, use its $type/$value conventions and supported typed values, such as dimension value/unit objects, structured colors and composite typography/shadows. Preserve the project's native source and metadata with a bounded adapter when appropriate. ShipRight's DESIGN.md YAML is not DTCG JSON.
Check invalid units/types, unresolvable aliases, circular references, alias target type mismatches and transformed-name collisions. Do not hide broken aliases with guessed fallback values. Stop the affected export/build claim and report the actual errors; supplied fallback behavior needs its own source and checks.
Identify references stripped or filtered during transforms. Verify that generated semantic references still point to emitted tokens and keep mode behavior; resolved output can otherwise freeze one theme unintentionally. Unknown tool compatibility stays Unknown. This guidance is not a complete DTCG validator.

## Bounded change and verification

Identify affected consumers before an authorized rename/deprecation. Preserve unrelated names/keys, approval history and existing formats; do not assume adapters, rollback or migration exist. No global token extraction for a label correction.
Use the actual project build/lint checks when available. Check changed computed values, aliases, approved exceptions, supported modes, contrast pairs and representative narrow/wide content. Search for arbitrary design literals in affected consumers with contextual review, not a blanket ban on all numbers. Document gaps without claiming a client install, full accessibility or production readiness.
Handoff: canonical location/version or explicitly Unknown; token/role -> actual implementation name -> consumer; allowed modes/exceptions; generation command if known; exact affected checks and unresolved decisions. Component contracts remain Phase 7.
