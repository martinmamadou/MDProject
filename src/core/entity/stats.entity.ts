import { UserEntity } from './user.entity';

export class StatsEntity {
  id_stats!: number
  cigaret_avoided!: number
  money_saved!: number
  days_without_smoking!: number
  user!: UserEntity
}
