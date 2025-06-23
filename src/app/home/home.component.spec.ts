import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { UserServiceService } from '../../core/services/user-service.service';
import { ChallengeService } from '../../core/services/challenge.service';
import { StatsService } from '../../core/services/stats.service';
import { RewardsService } from '../../core/services/rewards.service';
import { UserEntity } from '../../core/entity/user.entity';
import { ChallengeEntity } from '../../core/entity/challenge.entity';
import { StatsEntity } from '../../core/entity/stats.entity';
import { RewardEntity } from '../../core/entity/reward.entity';
import { configureTestingModule } from '../test-utils';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserServiceService>;
  let challengeService: jasmine.SpyObj<ChallengeService>;
  let statsService: jasmine.SpyObj<StatsService>;
  let rewardService: jasmine.SpyObj<RewardsService>;
  let router: jasmine.SpyObj<Router>;

  // Données de test avec les bonnes structures
  const mockUser: UserEntity = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'password',
    role: 'user',
    smoker_type: 'regular',
    packet_per_day: 1,
    packet_price: 10,
    smoke_duration: 5,
    goal: 'quit',
    last_cigaret_smoked: new Date(),
    points: 100,
    user_type: 'active',
    created_at: new Date(),
    login_date: new Date(),
    stats: []
  };

  const mockChallenge: ChallengeEntity = {
    id: 1,
    name: 'Défi test',
    description: 'Description du défi',
    difficulty: 'easy',
    points: 100,
    badges: 'badge1',
    is_active: true,
    target: 'daily',
    estimated_duration: 7,
    category_id: 1
  };

  const mockStats: StatsEntity = {
    id_stats: 1,
    cigaret_avoided: 50,
    money_saved: 150,
    days_without_smoking: 10,
    user: mockUser
  };

  const mockRewards: RewardEntity[] = [
    {
      id: 1,
      name: 'Récompense 1',
      description: 'Description récompense 1',
      points_needed: 100,
      is_active: true,
      category_id: 1,
      image_url: 'reward1.jpg'
    },
    {
      id: 2,
      name: 'Récompense 2',
      description: 'Description récompense 2',
      points_needed: 200,
      is_active: true,
      category_id: 1,
      image_url: 'reward2.jpg'
    }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserServiceService', ['getUserConnected']);
    const challengeServiceSpy = jasmine.createSpyObj('ChallengeService', ['loadRandomChallenge']);
    const statsServiceSpy = jasmine.createSpyObj('StatsService', ['getStatsByUserId']);
    const rewardServiceSpy = jasmine.createSpyObj('RewardsService', ['LoadRandomRewardLimit5']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await configureTestingModule(
      [HomeComponent],
      [
        { provide: UserServiceService, useValue: userServiceSpy },
        { provide: ChallengeService, useValue: challengeServiceSpy },
        { provide: StatsService, useValue: statsServiceSpy },
        { provide: RewardsService, useValue: rewardServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    ).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    userService = TestBed.inject(UserServiceService) as jasmine.SpyObj<UserServiceService>;
    challengeService = TestBed.inject(ChallengeService) as jasmine.SpyObj<ChallengeService>;
    statsService = TestBed.inject(StatsService) as jasmine.SpyObj<StatsService>;
    rewardService = TestBed.inject(RewardsService) as jasmine.SpyObj<RewardsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    userService.getUserConnected.and.returnValue(of(mockUser));
    challengeService.loadRandomChallenge.and.returnValue(of(mockChallenge));
    statsService.getStatsByUserId.and.returnValue(of(mockStats));
    rewardService.LoadRandomRewardLimit5.and.returnValue(of(mockRewards));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    component.ngOnInit();
    expect(userService.getUserConnected).toHaveBeenCalled();
    expect(component.user).toEqual(mockUser);
  });

  it('should load random challenge', () => {
    component.loadRandomChallenge();
    expect(challengeService.loadRandomChallenge).toHaveBeenCalled();
    expect(component.challenge).toEqual(mockChallenge);
  });

  it('should load stats for user', () => {
    component.user = mockUser;
    component.loadStats();
    expect(statsService.getStatsByUserId).toHaveBeenCalledWith(mockUser.id);
    expect(component.stats).toEqual(mockStats);
  });

  it('should load rewards', () => {
    component.loadRewards();
    expect(rewardService.LoadRandomRewardLimit5).toHaveBeenCalled();
    expect(component.rewards).toEqual(mockRewards);
  });

  it('should return correct reward image URL', () => {
    const result = component.getRewardImage(mockRewards[0]);
    expect(result).toBe('http://localhost:3000/uploads/reward1.jpg');
  });

  it('should navigate to reward details', () => {
    component.goToReward(mockRewards[0]);
    expect(router.navigate).toHaveBeenCalledWith(['/rewards/details', mockRewards[0].id]);
  });

  it('should have correct imageUrl property', () => {
    expect(component.imageUrl).toBe('../../assets/img/Logo.png');
  });
});
