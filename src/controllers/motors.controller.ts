import { NextFunction, Request, Response } from 'express';
import { Motor } from '@/interfaces/motor.interface';
import MotorService from '@/services/motors.service';
import rclnodejs, { Publisher } from 'rclnodejs'

const nodeName = 'api_node'
var node: rclnodejs.Node
var motorPub

rclnodejs.init()
.then(() => {
  console.log('[ROS2] Connection Successful')

  // this creates a new node, has the node every second publish to 

  // creates new node
  node = new rclnodejs.Node(nodeName) 

  // creates a publisher
  const msgType = 'uxa_sam_msgs/msg/PositionMove'
  const topic = 'sam_driver_position_move'
  // motorPub = node.createPublisher(msgType, topic)
  
  
  // runs the node
  node.spinOnce()

})
.catch(err => {
  console.log('[ROS2] Connection Failed')
  console.error(err)
})


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

  public setMotorPosition = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const motorId = Number(req.params.id)
      const newMotorPos = Number(req.params.position)
      const findOneMotorData: Motor = await this.motorService.findMotorById(motorId)

      res.status(200).json({ data: findOneMotorData, message: 'findOne' , new_position: newMotorPos})

    } catch (error) {
      next(error)
    }
  }
}



export default MotorsController;
