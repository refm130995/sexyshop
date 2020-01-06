import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MonedaPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moneda',
})
export class MonedaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number,
    currencySign: string = 'CLP $',
    decimalLength: number = 0, 
    milesDelimiter: string = '.', 
    decimalDelimiter:string = ',',
    chunkLength: number = 3): string {

    // value /= 100;

    let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    let num = value.toFixed(Math.max(0, ~~decimalLength));

    return currencySign+(decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + milesDelimiter);
}
}
