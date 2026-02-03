/**
 * Code in JavaScript - Command Parser
 * n8n node for parsing incoming messages and extracting commands
 */

const input = $input.first().json;

let command, target, subtype, args;

if (input.body?.command !== undefined) {
  command = input.body.command || '';
  target = input.body.target || null;
  subtype = input.body.subtype || null;
  args = input.body.args || '';
} else {
  const msg = input.body?.chatInput || input.body?.message || '';
  const trimmed = msg.trim();

  if (trimmed.startsWith('\')) {
    const parts = trimmed.split(' ');
    const cmd = (parts[0] || '').replace(/^\+/, '');
    args = parts.slice(1).join(' ');
    const cmdParts = cmd.split('_');
    command = cmdParts[0];
    target = cmdParts[1] || null;
    subtype = cmdParts[2] || null;
  } else {
    command = '';
    target = null;
    subtype = null;
    args = trimmed;
  }
}

const metaCmds = ['help', 'list', 'kickoff'];
const projectCmds = ['projects', 'new', 'describe', 'lint', 'delete'];
const devCmds = ['run', 'test', 'build', 'deploy'];
const ccCmds = ['cc'];

let category = 'unknown';
if (metaCmds.includes(command)) category = 'meta';
else if (projectCmds.includes(command)) category = 'project';
else if (devCmds.includes(command)) category = 'development';
else if (ccCmds.includes(command)) category = 'claude_code';

return [{
  json: { command, target, subtype, args, category }
}];
