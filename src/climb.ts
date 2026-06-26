
export interface Mountain {
  name: string;
  height: number;

  isDifficult(): boolean;
}

export class Rainer implements Mountain {
  name: string;
  height: number;

  constructor(name: string, height: number) {
    this.name = name;
    this.height = height;
  }

  isDifficult(): boolean {
    return true;
  }
}
