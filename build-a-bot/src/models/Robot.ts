import { RobotPart } from './RobotPart';

export interface Robot {
    head: RobotPart;
    leftArm: RobotPart;
    rightArm: RobotPart;
    torso: RobotPart;
    base: RobotPart;
    cost: number;
}
