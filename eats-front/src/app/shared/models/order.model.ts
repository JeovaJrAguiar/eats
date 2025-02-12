import {OrderStatus} from './order-status.enum';
import {User} from './user.model';

export interface OrderModel {
  orderId: number;
  description: string;
  value: number;
  status: OrderStatus;
  customer: User;
}
