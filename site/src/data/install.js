// Install lines for ShipRight 1.1.0.
// Source: README.md install table and GitHub release v1.1.0 assets.

export const release = 'v1.1.0'

export const skillsCommand = 'npx skills add aiwithaltaz/shipright-skills'

export const pluginSteps = [
  '/plugin marketplace add aiwithaltaz/shipright-skills',
  '/plugin install shipright@shipright',
]

export const tools = [
  { id: 'cursor', tool: 'Cursor', command: `${skillsCommand} -a cursor -y` },
  { id: 'codex', tool: 'Codex', command: `${skillsCommand} -a codex -y` },
  {
    id: 'vscode',
    tool: 'VS Code',
    command: `${skillsCommand} -a github-copilot -y`,
    note: 'The skills CLI names this agent github-copilot.',
  },
  { id: 'antigravity', tool: 'Antigravity', command: `${skillsCommand} -a antigravity -y` },
  { id: 'gemini-cli', tool: 'Gemini CLI', command: `${skillsCommand} -a gemini-cli -y` },
]

export const files = [
  {
    id: 'claude-ai',
    tool: 'Claude.ai',
    label: 'shipright.zip',
    href: 'https://github.com/aiwithaltaz/shipright-skills/releases/download/v1.1.0/shipright.zip',
    detail: 'Download shipright.zip from release v1.1.0 and upload it under Customize, Skills.',
  },
  {
    id: 'chatgpt',
    tool: 'ChatGPT',
    label: 'shipright-chatgpt.md',
    href: 'https://github.com/aiwithaltaz/shipright-skills/releases/download/v1.1.0/shipright-chatgpt.md',
    detail: 'Attach shipright-chatgpt.md from release v1.1.0 as project instructions or Custom GPT instructions.',
  },
]

export const globalNote = 'Add -g to install the skills command for every project.'

export const links = {
  github: 'https://github.com/aiwithaltaz/shipright-skills',
  changelog: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/CHANGELOG.md',
  releases: 'https://github.com/aiwithaltaz/shipright-skills/releases/tag/v1.1.0',
  credits: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/SOURCES.md',
  license: 'https://github.com/aiwithaltaz/shipright-skills/blob/main/LICENSE',
  author: 'https://github.com/aiwithaltaz',
}
