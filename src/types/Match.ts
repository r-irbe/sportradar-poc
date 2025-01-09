export interface Team {
  name: string
}

export interface Score {
  home: number
  away: number
}

export interface Match {
  homeTeam: Team
  awayTeam: Team
  score: Score
  startTime: Date
  sequenceNumber: number
}
