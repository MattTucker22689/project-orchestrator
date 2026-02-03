/**
 * Code in JavaScript1 - Command Handler
 * n8n node for executing commands and returning responses
 */

const d = $input.first().json;
const cmd = d.command;
const target = d.target;
const args = d.args || '';

const C = {
  p: process.env.PROJECTS_PATH || '/path/to/your/projects',
  s: process.env.SCRIPTS_PATH || '/path/to/your/scripts',
  db: process.env.NOTION_DB_ID || 'your-notion-database-id'
};

function r(m, a, x = {}) {
  return [{ json: { response: m, action: a, ...x } }];
}

function e(m) {
  return r('Error: ' + m, 'error');
}

// Help command
if (cmd === 'help') return r('PROJECT ORCHESTRATOR v3

PROJECT: list, new_project, describe, lint, delete
RESEARCH: research, arxiv, scholar, wikipedia
DEV: run, test, build, deploy
CLAUDE CODE: cc, cc_sessions, cc_diff
DOCS: note, readme, docs
SCHEDULE: schedule, remind', 'help');

// Project commands
if (cmd === 'list') return r('Fetching projects', 'list_projects');
if (cmd === 'describe') return r('Updating', 'describe', { name: target, desc: args });
if (cmd === 'lint') return r('Linting', 'lint', { name: target });
if (cmd === 'delete') return r('Deleting', 'delete', { name: target });
if (cmd === 'sync') return r('Syncing', 'sync', { name: target });
if (cmd === 'backup') return r('Backup', 'backup', { name: target });

// Research commands
if (cmd === 'research') return r('Researching', 'research', { topic: args });
if (cmd === 'arxiv') return r('ArXiv search', 'arxiv', { query: args });
if (cmd === 'scholar') return r('Scholar search', 'scholar', { query: args });

// Dev commands
if (cmd === 'run') return r('Running', 'run', { name: target, script: args });
if (cmd === 'test') return r('Testing', 'test', { name: target });
if (cmd === 'build') return r('Building', 'build', { name: target });
if (cmd === 'deploy') return r('Deploying', 'deploy', { name: target });

// Claude Code
if (cmd === 'cc') return r('Claude Code', 'cc', { name: target, prompt: args });

// Docs
if (cmd === 'note') return r('Note', 'note', { name: target, note: args });
if (cmd === 'readme') return r('README', 'readme', { name: target });

// Scheduling
if (cmd === 'schedule') return r('Schedule', 'schedule', { cron: target, cmd: args });
if (cmd === 'remind') return r('Remind', 'remind', { time: target, msg: args });

if (cmd === 'kickoff') return r('Kickoff', 'kickoff', { name: target, desc: args });

return e('Unknown: ' + cmd);
