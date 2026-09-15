import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";
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
}