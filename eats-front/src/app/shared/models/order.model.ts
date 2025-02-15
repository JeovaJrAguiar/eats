import {OrderStatus} from './order-status.enum';
import {User} from './user.model';

export interface Order {
  id?: number;
  description: string;
  value: number;
  status?: OrderStatus;
}
