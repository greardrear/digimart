import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(72)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Matches(/^\+?[0-9]{7,15}$/, {
    message: 'phone must contain a valid phone number',
  })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    location: string;

    @IsLatitude()
    latitude: string;

    @IsLongitude()
    longitude: string;
}