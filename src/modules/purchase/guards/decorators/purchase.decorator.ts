import { SetMetadata } from '@nestjs/common'
import { PurchasesEnum } from '../enums/purchases.enum'

export const HasPurchases = (purchases: PurchasesEnum[]) => SetMetadata('purchases', purchases)
