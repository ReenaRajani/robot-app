import Robot from '../Robot';
import { Directions } from '../types';

describe('Robot ', () => {
  const DEFAULT_GRID_DIMENSIONS = {
    x: 5,
    y: 5
  };
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot({ boundary: DEFAULT_GRID_DIMENSIONS });
  });

  it('creates a new Robot with default values', () => {
    expect(robot.position.x).toBe(0);
    expect(robot.position.y).toBe(0);
    expect(robot.direction).toBe(Directions.NORTH);
    expect(robot.isPlaced).toBeFalsy();
    expect(robot.boundary.x).toBe(DEFAULT_GRID_DIMENSIONS.x);
    expect(robot.boundary.y).toBe(DEFAULT_GRID_DIMENSIONS.y);
  });

  it('places the robot based on valid x,y and direction', () => {
    robot.placeRobot(2, 4, 'EAST');
    expect(robot.direction).toBe(Directions.EAST);
    expect(robot.isPlaced).toBeTruthy();
    expect(robot.position.x).toBe(2);
    expect(robot.position.y).toBe(4);
  });

  it('does not place the robot for invalid input', () => {
    robot.placeRobot(2, 4, 'EAT');
    expect(robot.isPlaced).toBeFalsy();
    expect(robot.position.x).toBe(0);
    expect(robot.position.y).toBe(0);
    expect(robot.direction).toBe(Directions.NORTH);
  });

  describe('Move Function', () => {
    it('moves the robot forward North', () => {
      robot.move();
      expect(robot.position.x).toBe(0);
      expect(robot.position.y).toBe(1);
      expect(robot.direction).toBe(Directions.NORTH);
    });

    it('moves the robot forward South ', () => {
      robot.placeRobot(2, 2, 'SOUTH');
      robot.move();
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(1);
      expect(robot.direction).toBe(Directions.SOUTH);
    });

    it('moves the robot forward West', () => {
      robot.placeRobot(3, 3, 'WEST');
      robot.move();
      expect(robot.position.x).toBe(2);
      expect(robot.position.y).toBe(3);
      expect(robot.direction).toBe(Directions.WEST);
    });

    it('moves the robot forward East', () => {
      robot.placeRobot(2, 3, 'EAST');
      robot.move();
      expect(robot.position.x).toBe(3);
      expect(robot.position.y).toBe(3);
      expect(robot.direction).toBe(Directions.EAST);
    });

    it('does not the robot over the boundary', () => {
      robot.placeRobot(4, 4, 'NORTH');
      robot.move();
      expect(robot.position.x).toBe(4);
      expect(robot.position.y).toBe(4);
      expect(robot.direction).toBe(Directions.NORTH);
      robot.placeRobot(0, 0, 'SOUTH');
      robot.move();
      expect(robot.position.x).toBe(0);
      expect(robot.position.y).toBe(0);
      expect(robot.direction).toBe(Directions.SOUTH);
    });
  });

  it('turns the robot to its left', () => {
    robot.placeRobot(2, 2, 'NORTH');
    expect(robot.direction).toBe(Directions.NORTH);
    robot.turnLeft();
    expect(robot.direction).toBe(Directions.WEST);
    robot.turnLeft();
    expect(robot.direction).toBe(Directions.SOUTH);
    robot.turnLeft();
    expect(robot.direction).toBe(Directions.EAST);
    robot.turnLeft();
    expect(robot.direction).toBe(Directions.NORTH);
  });

  it('turns the robot to its right', () => {
    robot.placeRobot(2, 2, 'NORTH');
    expect(robot.direction).toBe(Directions.NORTH);
    robot.turnRight();
    expect(robot.direction).toBe(Directions.EAST);
    robot.turnRight();
    expect(robot.direction).toBe(Directions.SOUTH);
    robot.turnRight();
    expect(robot.direction).toBe(Directions.WEST);
    robot.turnRight();
    expect(robot.direction).toBe(Directions.NORTH);
  });

  it('reports the current postion and direction', () => {
    robot.placeRobot(2, 2, 'NORTH');
    robot.turnRight();
    robot.move();
    expect(robot.report()).toBe(`3, 2, EAST`);
  });

  it('validates the direction', () => {
    expect(robot.isValidDirection('SAM')).toBe(false);
    expect(robot.isValidDirection('souht')).toBe(false);
    expect(robot.isValidDirection('NORTH')).toBe(true);
    expect(robot.isValidDirection('North')).toBe(true);
    expect(robot.isValidDirection('SOUTH')).toBe(true);
    expect(robot.isValidDirection('WEST')).toBe(true);
    expect(robot.isValidDirection('east')).toBe(true);
    expect(robot.isValidDirection('eASt')).toBe(true);
  });

  it('validates the position based on the boundary', () => {
    expect(robot.isValidPosition(6)).toBe(false);
    expect(robot.isValidPosition(2)).toBe(true);
    expect(robot.isValidPosition(5)).toBe(true);
    expect(robot.isValidPosition(-1)).toBe(false);
    expect(robot.isValidPosition(0)).toBe(true);
  });
});
