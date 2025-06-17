import { StatsEntity } from './stats.entity';

export class UserEntity {
  id!: number;
  username!: string;
  email!: string;
  role!: string;
  smoker_type!: string;
  packet_per_day!: number;
  packet_price!: number;
  smoke_duration!: number;
  goal!: string;
  last_cigaret_smoked!: Date;
  points!: number;
  user_type!: string;
  password!: string;
  created_at!: Date;
  login_date!: Date;
  stats!: StatsEntity[];
}