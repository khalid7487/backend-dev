import {NextFunction, Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import * as yup from 'yup'

import Controller from '@/common/controller.decorator'
import {Method, RequestMapping} from '@/common/RequestMapping'
import {validateSchema} from '@/utils/yup'
import {cacheMiddleware} from '@/middlewares/redisCaching'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup.string().required('Phone Number is required'),
  // couponCode: yup
  //   .string()
  //   .test("coupon-check", "Coupon code does not exist", async (value) => {
  //     if (!value) return true;
  //     const coupon = await db.couponCode.findUnique({ where: { code: value } });
  //     return !!coupon;
  //   }),
})

@Controller('users')
export class UserController {
  // constructor() {
  //   //this.service = new UserService();
  // }

  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: Register a new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: User's full name
   *                 example: John Doe
   *               email:
   *                 type: string
   *                 description: User's email address
   *                 example: johndoe@example.com
   *               phone:
   *                 type: string
   *                 description: User's phone number
   *                 example: "+1234567890"
   *     responses:
   *       200:
   *         user:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/Profile'
   *       400:
   *         description: Validation error
   */

  @RequestMapping({name: '/register', method: Method.POST})
  async register(req: Request, res: Response) {
    try {
      console.log(req.body, 'this is request')
      const {validatedData, errors} = await validateSchema({
        data: await req.body,
        schema,
      })

      if (errors) {
        return res.status(StatusCodes.BAD_REQUEST).json(errors)
      }

      console.log(validatedData, 'this is validate data')

      res.status(StatusCodes.OK).json('Hello, TypeScript with Express!')
    } catch (err) {
      console.log(err, 'this an error')
    }
  }

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Retrieve the user profile
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   $ref: '#/components/schemas/User'
   *       404:
   *         description: User not found
   */

  @RequestMapping({name: '/', method: Method.GET, middlewares: [cacheMiddleware]})
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // Simulating a successful user retrieval
      const users = [{name: 'test'}]
      return res.json(users)
      // throw new Error()
    } catch (error) {
      next(error)
    }
  }
}
