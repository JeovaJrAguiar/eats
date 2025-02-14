import {OrderStatus} from './order-status.enum';
import {User} from './user.model';

export interface Order {
  orderId: number;
  description: string;
  value: number;
  status?: OrderStatus;
  customer?: User;
}
