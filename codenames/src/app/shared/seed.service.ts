import { Injectable } from '@angular/core';
import { Randomizer } from '../Randomizer';
import { WordList } from '../WordList';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SeedService {
  
 

  private seed: string;
  private subject: Subject<string> = new Subject<string>();
  initialSeed: string;

  setSeed(seed: string): void {
    console.log("setting seed to be",seed);
    this.seed = seed;
    this.subject.next(seed);
    Randomizer.setSeed(this.seed);
  }
  
  getSeed(): Observable<string> {
    return this.subject.asObservable();
  }

  private generateInitialSeed():string{
    const timeBasedSeed = Randomizer.generateSeedFromTime();
    Randomizer.setSeed(timeBasedSeed);
    const friendlySeed = WordList.getRandomWords(2).join("");
    return friendlySeed;
  }

  constructor(){
    this.initialSeed = this.generateInitialSeed();
    this.setSeed(this.initialSeed);
  }
  
}
