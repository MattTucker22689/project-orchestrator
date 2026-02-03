/**
 * Code in JavaScript1 - Command Handler
 * n8n node for executing commands and returning responses
 *
 * This is the second code node in the workflow.
 * It receives parsed commands and returns appropriate responses.
 *
 * CONFIGURATION:
 * Replace the placeholder values in the C object with your own:
 * - p: Path to your projects directory
 * - s: Path to your orchestrator scripts directory
 * - db: Your Notion database ID (if using Notion integration)
 */

const d = $input.first().json;
const cmd = d.command;
const target = d.target;
const subtype = d.subtype;
const args = d.args || '';

// Configuration - Replace these with your own values or use environment variables
const C = {
  p: process.env.PROJECTS_PATH || '/path/to/your/projects',
  s: process.env.SCRIPTS_PATH || '/path/to/your/scripts',
  db: process.env.NOTION_DB_ID || 'your-notion-database-id'
};

// Helper functions
function r(m, a, x = {}) {
  return [{ json: { response: m, action: a, ...x } }];
}

function e(m) {
  return r('Error: ' + m, 'error');
}

// Command handlers
if (cmd === 'help') return r('📋 PROJECT ORCHESTRATOR v3 - 73+ COMMANDS

🗂️ PROJECT MANAGEMENT
  list, new_project, describe, lint, delete, sync, backup, restore, export, share

🔬 RESEARCH & KNOWLEDGE
  research, arxiv, scholar, wikipedia, perplexity, web
  summarize_url, summarize_pdf, cite, bibliography
  literature_review, compare_papers, fact_check

🛠️ DEVELOPMENT
  run, test, build, deploy, deploy_status, rollback_deploy
  format, analyze, coverage, benchmark
  deps_audit, deps_update

🔐 ENVIRONMENT & SECRETS
  env, envs, secrets, secret

🤖 CLAUDE CODE (cc)
  cc, cc_sessions, cc_cost, cc_diff
  cc_approve, cc_reject, cc_review
  cc_rollback, cc_watch, cc_stop, cc_config

📝 DOCUMENTATION
  note, readme, docs, report, find

📅 SCHEDULING & AUTOMATION
  schedule, schedule_list, schedule_delete
  remind, reminders, defer, recurring
  trigger_on, triggers, trigger_delete

⚡ QUICK START: kickoff, help', 'help');

if (cmd === 'list') return r('Fetching projects', 'list_projects');
if (cmd === 'new' && target === 'project') return r('Creating project', 'new_project', { name: subtype || args, type: args });
if (cmd === 'describe') return r('Updating description', 'describe', { name: target, version: subtype, desc: args });
if (cmd === 'lint') return r('Linting project', 'lint', { name: target, version: subtype });
if (cmd === 'delete') return r('Deleting', 'delete', { name: target, version: subtype });
if (cmd === 'sync') return r('Syncing', 'sync', { name: target });
if (cmd === 'backup') return r('Creating backup', 'backup', { name: target });
if (cmd === 'restore') return r('Restoring', 'restore', { name: target, id: subtype });
if (cmd === 'export') return r('Exporting', 'export', { name: target });
if (cmd === 'share') return r('Sharing', 'share', { name: target, email: subtype });

// Research commands
if (cmd === 'research') return r('Researching', 'research', { name: target, topic: args });
if (cmd === 'arxiv') return r('Searching ArXiv', 'arxiv', { name: target, query: args });
if (cmd === 'scholar') return r('Searching Scholar', 'scholar', { query: args });
if (cmd === 'wikipedia') return r('Fetching Wikipedia', 'wikipedia', { topic: args });
if (cmd === 'perplexity') return r('Querying Perplexity', 'perplexity', { query: args });
if (cmd === 'web') return r('Web search', 'web', { query: args });
if (cmd === 'summarize' && target === 'url') return r('Summarizing URL', 'summarize_url', { url: args });
if (cmd === 'summarize' && target === 'pdf') return r('Summarizing PDF', 'summarize_pdf', { path: args });
if (cmd === 'cite') return r('Adding citation', 'cite', { name: target, source: args });
if (cmd === 'bibliography') return r('Generating bibliography', 'bibliography', { name: target });
if (cmd === 'literature' && target === 'review') return r('Literature review', 'literature_review', { name: subtype, topic: args });
if (cmd === 'compare' && target === 'papers') return r('Comparing papers', 'compare_papers', { p1: subtype, p2: args });
if (cmd === 'fact' && target === 'check') return r('Fact checking', 'fact_check', { claim: args });

// Development commands
if (cmd === 'run') return r('Running', 'run', { name: target, script: args });
if (cmd === 'test') return r('Testing', 'test', { name: target, pattern: subtype });
if (cmd === 'build') return r('Building', 'build', { name: target });
if (cmd === 'deploy') return r('Deploying', 'deploy', { name: target, env: subtype });
if (cmd === 'deploy' && target === 'status') return r('Deploy status', 'deploy_status', { name: subtype });
if (cmd === 'rollback' && target === 'deploy') return r('Rolling back', 'rollback_deploy', { name: subtype });
if (cmd === 'format') return r('Formatting', 'format', { name: target });
if (cmd === 'analyze') return r('Analyzing', 'analyze', { name: target });
if (cmd === 'coverage') return r('Coverage report', 'coverage', { name: target });
if (cmd === 'benchmark') return r('Benchmarking', 'benchmark', { name: target });
if (cmd === 'deps' && target === 'audit') return r('Auditing deps', 'deps_audit', { name: subtype });
if (cmd === 'deps' && target === 'update') return r('Updating deps', 'deps_update', { name: subtype });

// Environment commands
if (cmd === 'env') return r('Setting env', 'env', { name: target, key: subtype, value: args });
if (cmd === 'envs') return r('Listing envs', 'envs', { name: target });
if (cmd === 'secrets') return r('Listing secrets', 'secrets', { name: target });
if (cmd === 'secret') return r('Setting secret', 'secret', { name: target, key: subtype, value: args });

// Claude Code commands
if (cmd === 'cc') return r('Claude Code', 'cc', { name: target, prompt: args, flag: subtype });
if (cmd === 'cc' && target === 'sessions') return r('CC sessions', 'cc_sessions', { name: subtype });
if (cmd === 'cc' && target === 'cost') return r('CC cost', 'cc_cost', { name: subtype });
if (cmd === 'cc' && target === 'diff') return r('CC diff', 'cc_diff', { name: subtype });
if (cmd === 'cc' && target === 'approve') return r('CC approve', 'cc_approve', { name: subtype });
if (cmd === 'cc' && target === 'reject') return r('CC reject', 'cc_reject', { name: subtype });
if (cmd === 'cc' && target === 'review') return r('CC review', 'cc_review', { name: subtype });
if (cmd === 'cc' && target === 'rollback') return r('CC rollback', 'cc_rollback', { name: subtype, session: args });
if (cmd === 'cc' && target === 'watch') return r('CC watch', 'cc_watch', { name: subtype });
if (cmd === 'cc' && target === 'stop') return r('CC stop', 'cc_stop', { name: subtype });
if (cmd === 'cc' && target === 'config') return r('CC config', 'cc_config', { name: subtype, key: args.split(' ')[0], value: args.split(' ').slice(1).join(' ') });

// Documentation commands
if (cmd === 'note') return r('Adding note', 'note', { name: target, note: args });
if (cmd === 'readme') return r('Generating README', 'readme', { name: target });
if (cmd === 'docs') return r('Generating docs', 'docs', { name: target });
if (cmd === 'report') return r('Generating report', 'report', { name: target });
if (cmd === 'find') return r('Searching', 'find', { name: target, query: args });

// Scheduling commands
if (cmd === 'schedule') return r('Scheduling', 'schedule', { cron: target, command: args });
if (cmd === 'schedule' && target === 'list') return r('Listing schedules', 'schedule_list');
if (cmd === 'schedule' && target === 'delete') return r('Deleting schedule', 'schedule_delete', { id: subtype });
if (cmd === 'remind') return r('Setting reminder', 'remind', { time: target, message: args });
if (cmd === 'reminders') return r('Listing reminders', 'reminders');
if (cmd === 'defer') return r('Deferring', 'defer', { duration: target, command: args });
if (cmd === 'recurring') return r('Recurring', 'recurring', { name: target, cron: subtype, command: args });
if (cmd === 'trigger' && target === 'on') return r('Setting trigger', 'trigger_on', { event: subtype, command: args });
if (cmd === 'triggers') return r('Listing triggers', 'triggers');
if (cmd === 'trigger' && target === 'delete') return r('Deleting trigger', 'trigger_delete', { id: subtype });

// Kickoff command
if (cmd === 'kickoff') return r('Kickoff', 'kickoff', { name: target, type: subtype, desc: args });

// Unknown command
return e('Unknown command: ' + cmd);
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
