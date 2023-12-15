import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningDto } from './dto/manning.dto';
import { Manning } from './manning.entity';
import { Public } from 'src/auth/auth.guard';


@Controller('manning')
export class ManningController {

    constructor(private manningService: ManningService){}

    @Public()
    @Post()
    createInfoManning(@Body() info: ManningDto){
        return this.manningService.createInfoManning(info);
    }

    @Public()
    @Get('parameter')
    GetInfoParameter(@Query() manningDto: ManningDto): Promise <Manning[]>{
        return this.manningService.getInfoParameter(manningDto);
    }

    @Public()
    @Get()
    GetInfoManning(@Query() manningDto: ManningDto): Promise <Manning[]>{
        return this.manningService.getAllInfoManning(manningDto);
    }
    
    @Patch(':id')
    UpdateInfoManning(@Param('id', ParseIntPipe) id: number, @Body() manning: ManningDto){
        return this.manningService.updateInfoManning(id, manning);
    }
    

    @Delete(':id')
    DeleteInfoManning(@Param('id', ParseIntPipe) id: number){
        return this.manningService.deleteInfoManning(id)
    }

}
