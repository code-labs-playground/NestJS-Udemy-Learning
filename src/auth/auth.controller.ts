import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authCredentials: AuthCredentialsDto): Promise<void> {
    // console.log('Received signup request:', authCredentials);
    return this.authService.signUp(authCredentials);
  }

  @Post('signin')
  signIn(@Body() authCredentials: AuthCredentialsDto): Promise<string> {
    // console.log('Received signin request:', authCredentials);
    return this.authService.signIn(authCredentials);
  }
}
