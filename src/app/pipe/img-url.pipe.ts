import { Pipe, PipeTransform } from '@angular/core';
import { Api } from 'environments/environment';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe extends Api implements PipeTransform {
  constructor() {
    super();
  }

  transform(value: any, args?: any): any {
    return this.ImgUrl + value;
  }

}
