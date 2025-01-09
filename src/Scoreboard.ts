import { Match, Team, Score } from './types/Match'

export class Scoreboard {
  private static readonly DEFAULT_SCORE: Score = { home: 0, away: 0 }
  private matches: Match[] = []
  private currentSequence = 0

  startMatch(homeTeam: Team, awayTeam: Team): void {
    this.validateTeams(homeTeam, awayTeam)

    if (this.isMatchStarted(homeTeam, awayTeam)) {
      throw new Error('Match is already started')
    }
    const match: Match = {
      homeTeam,
      awayTeam,
      score: { ...Scoreboard.DEFAULT_SCORE },
      startTime: new Date(),
      sequenceNumber: ++this.currentSequence,
    }
    this.matches.push(match)
  }

  updateScore(homeTeam: Team, awayTeam: Team, updatedScore: Score): void {
    this.validateScore(updatedScore)

    const match = this.findMatch(homeTeam, awayTeam)
    if (!match) {
      throw new Error(
        `Match between ${homeTeam.name} and ${awayTeam.name} not found`,
      )
    }
    match.score = updatedScore
  }

  finishMatch(homeTeam: Team, awayTeam: Team): void {
    const match = this.findMatch(homeTeam, awayTeam)
    if (!match) {
      throw new Error(
        `Match between ${homeTeam.name} and ${awayTeam.name} not found`,
      )
    }

    this.matches = this.matches.filter((m) => m !== match)
  }

  getSummary(): Match[] {
    return this.matches
      .slice()
      .map((match) => ({
        homeTeam: { ...match.homeTeam },
        awayTeam: { ...match.awayTeam },
        score: { ...match.score },
        startTime: new Date(match.startTime.getTime()),
        sequenceNumber: match.sequenceNumber,
      }))
      .sort((a, b) => {
        const totalScoreDiff = this.getTotalScore(b) - this.getTotalScore(a)
        return totalScoreDiff !== 0
          ? totalScoreDiff
          : b.sequenceNumber - a.sequenceNumber
      })
  }

  private findMatch(homeTeam: Team, awayTeam: Team): Match | undefined {
    return this.matches.find(
      (m) =>
        this.normalizeName(m.homeTeam.name) ===
          this.normalizeName(homeTeam.name) &&
        this.normalizeName(m.awayTeam.name) ===
          this.normalizeName(awayTeam.name),
    )
  }

  private normalizeName(name: string): string {
    return name.trim().toLowerCase()
  }

  private validateTeams(homeTeam: Team, awayTeam: Team): void {
    if (homeTeam.name === awayTeam.name) {
      throw new Error('Home and away teams cannot be the same')
    }
  }

  private validateScore(score: Score): void {
    if (
      score.home < 0 ||
      score.away < 0 ||
      !Number.isInteger(score.home) ||
      !Number.isInteger(score.away)
    ) {
      throw new Error('Score must be a non-negative integer')
    }
  }

  private isMatchStarted(homeTeam: Team, awayTeam: Team): boolean {
    return this.matches.some(
      (match) =>
        this.normalizeName(match.homeTeam.name) ===
          this.normalizeName(homeTeam.name) &&
        this.normalizeName(match.awayTeam.name) ===
          this.normalizeName(awayTeam.name),
    )
  }

  private getTotalScore(match: Match): number {
    return match.score.home + match.score.away
  }
}
