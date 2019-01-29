import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SummaryReportPage } from './summary-report';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    SummaryReportPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SummaryReportPage),
  ],
})
export class SummaryReportPageModule {}
