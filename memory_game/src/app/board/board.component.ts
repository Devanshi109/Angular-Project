import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Card } from '../interface/card';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  emojis = ['🐵', '🐶', '🦊', '🐱', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', '🐮', '🐷', '🐭', '🐹', '🐻', '🐨', '🐼', '🐽', '🐸', '🐰', '🐙'];

  cards = signal<Card[]>([]);
  flippedCards: Card[] = [];
  isGameOver = signal(false);
  pairs = 8;

  constructor() {
    this.game();
  }

  game() {
    const selected = this.shuffle([...this.emojis]).slice(0, this.pairs);
    const paired = [...selected, ...selected]
    .map((emoji, i) => ({id: i, emoji, isFlipped: false, isMatched: false }));
    
    this.cards.set(this.shuffle(paired));
    this.isGameOver.set(false);
    this.flippedCards = [];
  }

  flip(card: Card) {
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      const [first, second] = this.flippedCards;
      if (first.emoji === second.emoji) {
        first.isMatched = second.isMatched = true;
        this.flippedCards = [];

        if (this.cards().every(c => c.isMatched)) {
          this.isGameOver.set(true);
        }
      } else {
        setTimeout(() => {
          first.isFlipped = second.isFlipped = false;
          this.flippedCards = [];
        }, 500);
      }
    }
  }

  private shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }
}
