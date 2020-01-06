import { NgModule } from '@angular/core';
import { MomentPipe } from './moment/moment';
import { MonedaPipe } from './moneda/moneda';
@NgModule({
	declarations: [MomentPipe,
    MonedaPipe],
	imports: [],
	exports: [MomentPipe,
    MonedaPipe]
})
export class PipesModule {}
