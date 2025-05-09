import { StatsEntity } from './stats.entity';

export class UserEntity {
  id!: number;
  username!: string;
  email!: string;
  role!: string;
  smoker_type!: string;
  points!: number;
  user_type!: string;
  password!: string;
  created_at!: Date;
  login_date!: Date;
  stats!: StatsEntity[];
}