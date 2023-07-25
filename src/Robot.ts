import type { PositionT } from './types';
import { Directions } from './types';

export interface IRobotOptions {
  boundary: PositionT;
}

export default class Robot {
  public direction: Directions;
  public position: PositionT;

  public boundary: PositionT;
  public isPlaced: boolean;

  constructor(options: IRobotOptions) {
    this.isPlaced = false;
    this.direction = Directions.NORTH;
    this.boundary = options.boundary;
    this.position = { x: 0, y: 0 };
  }

  /**
   * @description place the robot in the defined direction and x, y coordinates
   */
  public placeRobot(x: number, y: number, dir: string) {
    if (
      this.isValidPosition(x) &&
      this.isValidPosition(y) &&
      this.isValidDirection(dir)
    ) {
      this.position.x = x;
      this.position.y = y;
      this.direction = Directions[dir as keyof typeof Directions];
      this.isPlaced = true;
    } else {
      console.log(
        'Invalid Place command, please try with PLACE X,Y,F eg: PLACE 0,0,NORTH'
      );
    }
  }

  /**
   * @description Turn the robot 90 degree to its left
   */
  public turnLeft(): Directions {
    const newDirection =
      this.direction === Directions.NORTH
        ? Directions.WEST
        : this.direction - 1;
    return (this.direction = newDirection);
  }

  /**
   * @description Turn the robot 90 degree to its right
   */
  public turnRight(): Directions {
    const newDirection =
      this.direction === Directions.WEST
        ? Directions.NORTH
        : this.direction + 1;
    return (this.direction = newDirection);
  }

  /**
   * @description Moves the robot forward based on it's current facing direction
   */
  public move(): boolean {
    switch (this.direction) {
      case Directions.NORTH:
        this.position.y + 1 < this.boundary.y ? this.position.y++ : null;
        break;
      case Directions.SOUTH:
        this.position.y - 1 >= 0 ? this.position.y-- : null;
        break;
      case Directions.EAST:
        this.position.x + 1 < this.boundary.x ? this.position.x++ : null;
        break;
      case Directions.WEST:
        this.position.x - 1 >= 0 ? this.position.x-- : null;
        break;
      default:
    }
    return true;
  }

  /**
   * @description Returns the current position of the robot
   */
  public report(): string {
    return `${this.position.x}, ${this.position.y}, ${
      Directions[this.direction]
    }`;
  }

  /**
   * @description Checks if the position does not cross the boundary
   */
  isValidPosition(position: number): boolean {
    return position <= this.boundary.x && position >= 0;
  }

  /**
   * @description Checks if input is a valid direction
   */
  isValidDirection(direction: string): boolean {
    return Object.values(Directions).includes(direction.toUpperCase())
      ? true
      : false;
  }
}
