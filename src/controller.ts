import Robot from './Robot';
import type { PositionT } from './types';
import { parsePlaceCommand } from './helpers/utils';

const DEFAULT_GRID_DIMENSIONS: PositionT = {
  x: 5,
  y: 5
};

const validPromptMessage = `Valid Commands:\n \
PLACE X,Y,F eg: PLACE 0,0,NORTH\n \
MOVE\n \
LEFT\n \
RIGHT\n \
REPORT\n \
EXIT \n`;

export default class Controller {
  private robot;

  constructor() {
    this.robot = new Robot({ boundary: DEFAULT_GRID_DIMENSIONS });
  }

  /**
   * @description calls the required methods based on the input entered.
   */

  public executeCommand(command: string): void {
    if (command.includes('PLACE')) {
      const { x, y, direction } = parsePlaceCommand(command);
      this.robot.placeRobot(x, y, direction);
    } else if (this.robot.isPlaced) {
      switch (command.trim()) {
        case 'MOVE':
          this.robot.move();
          break;
        case 'LEFT':
          this.robot.turnLeft();
          break;
        case 'RIGHT':
          this.robot.turnRight();
          break;
        case 'REPORT':
          console.log(this.robot.report());
          break;
        default:
          console.log('Invalid Command!');
          console.log(validPromptMessage);
      }
    } else {
      console.log(
        'The Robot needs to be PLACED first before other commands are executed'
      );
    }
  }
}
