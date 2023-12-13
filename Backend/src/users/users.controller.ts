import { Controller,Post, Get, Body, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update_user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}


    @Post()
    createUser(@Body() user: CreateUserDto)/*: Promise<User>*/{
        return this.usersService.createUser(user);
    }

    @Get(':id')
    GetUser(@Param('id', ParseIntPipe) id: number)/*: Promise <User>*/ {
        return this.usersService.getUser(id);
    }

    @Get()
    GetUsers(): Promise <User[]>{
        return this.usersService.getUsers();
    }

    @Patch(':id')
    UpdateUsers(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }
    

    @Delete(':id')
    DeleteUsers(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id)
    }

    
}
