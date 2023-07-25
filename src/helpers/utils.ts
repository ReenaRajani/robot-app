type PlacePropsT = {
  x: number;
  y: number;
  direction: string;
};

/**
 * @description fetches the input in the format PLACE X, Y, Direction and parses the comma seperated values
 */
export function parsePlaceCommand(command: string): PlacePropsT {
  const data = command.split(/[ ,]+/);
  return {
    x: parseInt(data[1]),
    y: parseInt(data[2]),
    direction: data[3]
  };
}
