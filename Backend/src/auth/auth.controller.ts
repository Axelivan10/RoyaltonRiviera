import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request, Patch, ParseIntPipe, Param, Delete} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create_user.dto';
import { AuthGuard, IS_PUBLIC_KEY, Public } from './auth.guard';
import { UpdateUserDto } from 'src/users/dto/update_user.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() newUser: CreateUserDto ) {
    return this.authService.loginAuth(newUser);
  }

  @Public()
  @Post(":id") 
  email(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this.authService.sendEmail(id, user);
  }


  @Public()
  @Patch(':id') 
  code(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) { 
    return this.authService.checkCode(id, user);
  }
  
  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
    
  }

}
