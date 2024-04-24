import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class ActiveGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest()

    if (!user) {
      throw new UnauthorizedException(await this.i18n.t('error.user_deactivated'))
    }

    const canActivate = true //await this.userService.canUserActivate(user.user_id) TODO

    if (canActivate) {
      return canActivate
    } else {
      throw new ForbiddenException(await this.i18n.t('error.user_deactivated'))
    }
  }
}
