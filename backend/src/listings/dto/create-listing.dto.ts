import { IsEnum, IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString, MaxLength } from "class-validator";
import { ListingCategory } from "../enums/listing-category.enum.js";

export class CreateListingDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    description: string;

    @IsNumberString()
    @IsNotEmpty()
    price: string;

    @IsNumberString()
    @IsNotEmpty()
    availableQuantity: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumberString()
    @IsNotEmpty()
    latitude: string;

    @IsNumberString()
    @IsNotEmpty()
    longitude: string;

    @IsEnum(ListingCategory)
    @IsNotEmpty()
    category: ListingCategory;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    sellerId: number;
}