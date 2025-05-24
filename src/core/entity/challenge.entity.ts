export class ChallengeEntity {
    id!: number;
    name!: string;
    description!: string;
    difficulty!: string;
    points!: number;
    badges!: string;
    is_active!: boolean;
    target!: string;
    estimated_duration!: number;
    category_id!: number;
}
