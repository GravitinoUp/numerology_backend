import { Injectable } from '@nestjs/common'
import { Purchase } from './entities/purchase.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { I18nService } from 'nestjs-i18n'
import { RolesEnum } from 'src/common/constants/constants'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { format } from 'date-fns'

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}

  async checkPurchase(product_sku: string, user_uuid: string): Promise<boolean> {
    const user = await this.userRepository.createQueryBuilder().select().where({ user_uuid }).getOne()

    if (!user) {
      return false
    } else if (user.role_id == RolesEnum.ADMIN) {
      return true
    } else {
      const purchase = await this.purchaseRepository
        .createQueryBuilder()
        .select()
        .where({ product_sku, user_uuid })
        .andWhere('expiration_date >= :date OR expiration_date IS NULL', {
          date: format(Date.now(), 'dd.MM.yyyy HH:mm:ss'),
        })
        .getOne()

      console.log(purchase)

      if (!purchase) {
        return false
      } else {
        return true
      }
    }
  }
}
