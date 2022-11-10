import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
import MotorService from '@/services/motors.service';

class MotorsController {
  public motorService = new MotorService();

  public getMotors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMotorsData: Motor[] = await this.motorService.findAllMotors();

      res.status(200).json({ data: findAllMotorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMotorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motorId = Number(req.params.id)
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)

      res.status(200).json({ data: findOneMotorData, message: 'findOne' })
    } catch (error) {
      next(error)
    }
  }
}

export default MotorsController;
