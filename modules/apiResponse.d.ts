interface PlayerOverviewResponse {
  player_id: string;
  name: string;
  exp_level: number;
  trophies: number;
  best_trophies: number;
  wins: number;
  losses: number;
  battle_count: number;
  three_crown_wins: number;
  challenge_cards_won: number;
  challenge_max_wins: number;
  tournament_cards_won: number;
  tournament_battle_count: number;
  role: string;
  donations: number;
  donations_received: number;
  total_donations: number;
  war_day_wins: number;
  clan_cards_collected: number;
  current_deck: FavouriteCardPO[];
  favourite_card: FavouriteCardPO;
  cards: FavouriteCardPO[];
  clan: ClanPO;
  updated_time: string;
}

interface FavouriteCardPO {
  name: string;
  card_id: number;
  level: number;
  count: number;
  max_level: number;
  icon_url: string;
  star_level: number;
}

interface ClanPO {
  tag: string;
  name: string;
  badge_id: string;
}
