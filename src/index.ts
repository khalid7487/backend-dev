import {Container} from 'typedi'

import {UserController} from '@/controller/auth/user.controller'

Container.set(UserController, new UserController())
