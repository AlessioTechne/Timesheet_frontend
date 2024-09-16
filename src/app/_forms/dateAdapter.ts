import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    // Imposta il primo giorno della settimana a lunedì (0 = domenica, 1 = lunedì)
    return 1;
  }
}
