import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ManningService } from './manning.service';
import { ManningDto } from './dto/manning.dto';
import { Manning } from './entities/manning.entity';
import { Public } from 'src/auth/auth.guard';
import { dimLocationDto } from './dto/dim/dim_location.dto';
import { dimPlant } from './entities/dim/dim_plant.entity';
import { dimPlantDto } from './dto/dim/dim_plant.dto';
import { serviceTypeConfigDto } from './dto/configuration/serviceType_config.dto';


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

    @Public()
    @Get('testLocationConfigDepartment')
    testLocationConfigDepartment(){
        return this.manningService.testLocationConfigDepartment();
    }

    @Public()
    @Get('testLocationConfigLocation')
    testLocationConfigLocation(){
        return this.manningService.testLocationConfigLocation();
    }


    @Public()
    @Get('relationsLocationConfig')
    relationsLocationConfig(){
        return this.manningService.relationsLocationConfig();
    }

    @Public()
    @Get('relationsPlantConfig')
    relationsPlantConfig(){
        return this.manningService.relationsPlantConfig();
    }

    @Public()
    @Get('relationsShiftConfig')
    relationsShiftConfig(){
        return this.manningService.relationsShiftConfig();
    }

    @Public()
    @Get('relationsServiceTypeConfig')
    relationsServiceTypeConfig(){
        return this.manningService.relationsServiceTypeConfig();
    }

    @Public()
    @Get('relationsPositionConfig')
    relationsPositionConfig(){
        return this.manningService.relationsPositionConfig();
    }

    @Public()
    @Get('relationsPosLocConfig')
    relationsPosLocConfig(){
        return this.manningService.relationsPosLocConfig();
    }

    @Public()
    @Get('relationsStandardTableConfig')
    relationsStandardTableConfig(){
        return this.manningService.relationsStandardTableConfig();
    }

    @Public()
    @Get('relationsSizeCriteriaConfig')
    relationsSizeCriteriaConfig(){
        return this.manningService.relationsSizeCriteriaConfig();
    }

    // THIS PART IS FOR ALL THE FILTERS THAT NEED A REQUEST FROM THE DB
    @Public()
    @Get('hotels')
    getHotels(){
        return this.manningService.getHotels();
    }

    @Public()
    @Put('updateHotels')
    updateHotels(@Body() editValues: {}){
        return this.manningService.updateHotels(editValues);
    }

    @Public()
    @Get('division')
    getDivision(){
        return this.manningService.getDivision();
    }

    @Public()
    @Get('shift')
    getShift(){
        return this.manningService.getShift();
    }

    @Public()
    @Get('serviceType')
    getServiceType(){
        return this.manningService.getServiceType();
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

    @Public()
    @Get('locationConfig')
    locationConfig(){
        return this.manningService.locationConfig();
    }

    @Public()
    @Get('plantConfig')
    plantConfig(){
        return this.manningService.plantConfig();
    }

    @Public()
    @Get('shiftConfig')
    shiftConfig(){
        return this.manningService.shiftConfig();
    }

    @Public()
    @Get('serviceTypeConfig')
    serviceTypeConfig(){
        return this.manningService.serviceTypeConfig();
    }

    
    @Public()
    @Put('updateLocationsConfig')
    updateLocationsConfig(@Body() editInputs: {}){
        return this.manningService.updateLocationsConfig(editInputs);
    }

    @Public()
    @Put('updatePlantConfig')
    updatePlantConfig(@Body() editInputs: {}){
        return this.manningService.updatePlantConfig(editInputs);
    }

    @Public()
    @Put('updateShiftConfig')
    updateShiftConfig(@Body() editInputs: {}){
        return this.manningService.updateShiftConfig(editInputs);
    }

    @Public()
    @Put('updateServiceTypeConfig')
    updateServiceTypeConfig(@Body() editInputs: {}){
        console.log(editInputs)
        return this.manningService.updateServiceTypeConfig(editInputs);
    }

    @Public()
    @Put('updatePositionConfig')
    updatePositionConfig(@Body() editInputs: {}){
        console.log(editInputs)
        return this.manningService.updatePositionConfig(editInputs);
    }

    @Public()
    @Put('updatePosLocConfig')
    updatePosLocConfig(@Body() editInputs: {}){
        console.log(editInputs)
        return this.manningService.updatePosLocConfig(editInputs);
    }

    @Public()
    @Post('createLocation')
    createLocation(@Body() dataLocation: dimLocationDto ) {
    return this.manningService.createLocation(dataLocation);
  }

    @Public()
    @Post('createPlant')
    createPlant(@Body() dataPlant: dimPlantDto ) {
        console.log(dataPlant)
        return this.manningService.createPlant(dataPlant);
    }

    @Public()
    @Post('createServiceTypeConfig')
    createServiceTypeConfig(@Body() dataValues: serviceTypeConfigDto ) {
        return this.manningService.createServiceTypeConfig(dataValues);
    }

}
