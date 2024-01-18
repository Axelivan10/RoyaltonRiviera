import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningDto } from './dto/manning.dto';
import { Manning } from './entities/manning.entity';
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
    GetInfoManning(@Query() manningDto: ManningDto){
        console.log("hola mundo")
        console.log(manningDto)
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


    //TEST FOR ALL THE RELATIONS IN DB
    @Public()
    @Get('testDivision')
    testDivision(){
        return this.manningService.testDivision();
    }

    @Public()
    @Get('testDepartment')
    testDepartment(){
        return this.manningService.testDepartment();
    }


    // THIS PART IS FOR ALL THE FILTERS THAT NEED A REQUEST FROM THE DB
    @Public()
    @Get('hotels')
    getHotels(){
        return this.manningService.getHotels();
    }

    @Public()
    @Get('division')
    getDivision(){
        return this.manningService.getDivision();
    }

    //NEXT PART IS FOR ALL THE ARRAYS

    @Public()
    @Get('department')
    getDepartment(){
        return this.manningService.getDepartment();
    }

    @Public()
    @Get('location')
    getLocation(){
        return this.manningService.getLocation();
    }
}
