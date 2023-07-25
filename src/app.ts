import * as readline from 'readline';
import Controller from './controller';

const controller = new Controller();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
  prompt: 'Enter Command > '
});

rl.prompt();

rl.on('line', (response: string) => {
  if (response.toUpperCase() === 'EXIT') {
    rl.close();
    process.exit();
  } else {
    controller.executeCommand(response.trim().toUpperCase());
    rl.prompt();
  }
});
