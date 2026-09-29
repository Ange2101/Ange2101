import { differenceInDays, format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

export function calculerNbJours(debut: string, fin: string): number {
  return Math.max(1, differenceInDays(parseISO(fin), parseISO(debut)))
}

export function formaterDate(date: string): string {
  return format(parseISO(date), 'd MMMM yyyy', { locale: fr })
}

export function formaterDateCourte(date: string): string {
  return format(parseISO(date), 'd MMM', { locale: fr })
}

export function aujourdhui(): string {
  return format(new Date(), 'yyyy-MM-dd')
}
