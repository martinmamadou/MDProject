import { StatsEntity } from './stats.entity';

export class UserEntity {
  id_user!: number;
  username!: string;
  email!: string;
  role!: string;
  password!: string;
  created_at!: Date;
  login_date!: Date;
  stats!: StatsEntity[];
}