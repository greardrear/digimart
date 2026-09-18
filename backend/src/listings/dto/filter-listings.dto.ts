import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Matches } from "class-validator";
import { ListingCategory } from "../enums/listing-category.enum.js";

export class FilterListingsDto {
    @IsOptional()
    @IsNumberString()
    latitude?: string;

    @IsOptional()
    @IsNumberString()
    longitude?: string;

    @IsOptional()
    @IsNumberString()
    radius?: string;

    @IsOptional()
    @IsEnum(ListingCategory)
    category?: ListingCategory;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @Matches(/^[1-9]\d*$/, {
    message: 'page must be a positive integer',
    })
    page?: string;

    @IsOptional()
    @IsIn(['10', '20', '50', '100'], {
    message: 'pageSize must be 10, 20, 50 or 100',
    })
    pageSize?: string;
}