import { IsInt, IsNotEmpty, IsPositive, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateRatingDto {
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    comment: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    reviewerId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    reviewedUserId: number;
}