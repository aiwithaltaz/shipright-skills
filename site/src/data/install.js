// Install commands for the ShipRight site.
// Edit this file when ShipRight 1.1 changes the package.
// Agent flags are the public names from the skills CLI (npx skills).
// Pack 1.0 verified manual file use. These native installs are not verified yet.

export const skillsCommand = 'npx skills add aiwithaltaz/shipright-skills'

export const tools = [
  { id: 'claude-code', tool: 'Claude Code', command: `${skillsCommand} -a claude-code` },
  { id: 'cursor', tool: 'Cursor', command: `${skillsCommand} -a cursor` },
  { id: 'codex', tool: 'Codex', command: `${skillsCommand} -a codex` },
  {
    id: 'vscode',
    tool: 'VS Code',
    command: `${skillsCommand} -a github-copilot`,
    note: 'The skills CLI names this agent github-copilot.',
  },
  { id: 'antigravity', tool: 'Antigravity', command: `${skillsCommand} -a antigravity` },
  { id: 'gemini-cli', tool: 'Gemini CLI', command: `${skillsCommand} -a gemini-cli` },
]

export const plugin = {
  tool: 'Claude Code plugin',
  command: '/plugin marketplace add aiwithaltaz/shipright-skills',
  // Set this when ShipRight 1.1 names the plugin, for example "/plugin install name@marketplace".
  install: '',
  note: 'Run this inside Claude Code. Plugin install command: not set. It will be added when ShipRight 1.1 names the plugin.',
}

export const zip = {
  href: 'https://github.com/aiwithaltaz/shipright-skills/archive/refs/heads/main.zip',
  label: 'Download the pack (.zip)',
}

export const claudeAi =
  'In Claude.ai, upload the skill files to a project. A native install is not verified for 1.0.'

export const chatgpt =
  'In ChatGPT, attach the pack or keep the folder where ChatGPT can read files. Start from skills/build-pack/SKILL.md. A native install is not verified.'

export const links = {
  github: 'https://github.com/aiwithaltaz/shipright-skills',
  changelog: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/CHANGELOG.md',
  releases: 'https://github.com/aiwithaltaz/shipright-skills/releases',
  credits: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/SOURCES.md',
  license: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/LICENSE',
  author: 'https://github.com/aiwithaltaz',
}
