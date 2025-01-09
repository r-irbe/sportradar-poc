import { Match, Team, Score } from './types/Match'

export class Scoreboard {
  private static readonly DEFAULT_SCORE: Score = { home: 0, away: 0 }
  private matches: Match[] = []
  private currentSequence = 0

  startMatch(homeTeam: Team, awayTeam: Team): void {
    const matchExists = this.matches.some(
      (match) =>
        match.homeTeam.name === homeTeam.name &&
        match.awayTeam.name === awayTeam.name,
    )

    if (matchExists) {
      throw new Error('Match is already started')
    }
    const match: Match = {
      homeTeam,
      awayTeam,
      score: Scoreboard.DEFAULT_SCORE,
      startTime: new Date(),
      sequenceNumber: ++this.currentSequence,
    }
    this.matches.push(match)
  }

  updateScore(homeTeam: Team, awayTeam: Team, score: Score): void {
    const match = this.findMatch(homeTeam, awayTeam)
    if (!match) {
      throw new Error('Match not found')
    }
    match.score = score
  }

  finishMatch(homeTeam: Team, awayTeam: Team): void {
    const index = this.matches.findIndex(
      (m) =>
        m.homeTeam.name === homeTeam.name && m.awayTeam.name === awayTeam.name,
    )
    if (index === -1) {
      throw new Error('Match not found')
    }
    this.matches.splice(index, 1)
  }

  getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalScoreA = a.score.home + a.score.away
      const totalScoreB = b.score.home + b.score.away

      if (totalScoreB !== totalScoreA) {
        return totalScoreB - totalScoreA
      }

      return b.sequenceNumber - a.sequenceNumber
    })
  }

  private findMatch(homeTeam: Team, awayTeam: Team): Match | undefined {
    return this.matches.find(
      (m) =>
        m.homeTeam.name === homeTeam.name && m.awayTeam.name === awayTeam.name,
    )
  }
}
