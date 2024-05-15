import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from 'src/modules/user/user.service'
import { Roles } from './decorators/role.decorator'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    if (user) {
      const currentUser = await this.userService.findByUuid(user.user_uuid)

      if (currentUser) {
        if (roles.includes(currentUser.role_id)) {
          return true
        } else {
          throw new UnauthorizedException(this.i18n.t('errors.access_denied'))
        }
      } else {
        throw new UnauthorizedException(this.i18n.t('errors.access_denied'))
      }
    } else {
      throw new UnauthorizedException(this.i18n.t('errors.access_denied'))
    }
  }
}
