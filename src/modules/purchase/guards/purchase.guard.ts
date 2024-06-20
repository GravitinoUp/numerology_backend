import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { PurchaseService } from '../purchase.service'
import { Reflector } from '@nestjs/core'
import { PurchasesEnum } from './enums/purchases.enum'

@Injectable()
export class PurchaseGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly purchaseService: PurchaseService,
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (true) {
      return true
    } else {
      const requiredPurchases = this.reflector.getAllAndOverride<PurchasesEnum[]>('purchases', [
        context.getHandler(),
        context.getClass(),
      ])

      if (!requiredPurchases) {
        return true
      }

      const { user } = context.switchToHttp().getRequest()
      const result = await asyncSome(requiredPurchases, async (purchase) => {
        return await this.purchaseService.checkPurchase(purchase, user.user_uuid)
      })

      if (result) {
        return result
      } else {
        throw new ForbiddenException(this.i18n.t('errors.access_denied'))
      }
    }
  }
}

const asyncSome = async (array, predicate) => {
  for (const element of array) {
    if (await predicate(element)) return true
  }
  return false
}
