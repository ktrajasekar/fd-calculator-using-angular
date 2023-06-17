import { Component } from '@angular/core';
import { CoolTheme } from './charttheme';
import type { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'fd';
  principalAmount: number = 5000;
  interestRate: number = 0;
  tenureMonths: number = 1;
  interestEarned: number;
  finalAmount?: number;
  calculated: boolean = false;

  theme: string | ThemeOption;
  coolTheme = CoolTheme;

  options: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      align: 'right',
      data: ['Principal Amount', 'Interest Earned'],
    },
    series: [
      {
        name: 'Amount',
        type: 'pie'
      },
    ],
  };
  updateOptions: EChartsOption;

  calculate() {
    const interest = (this.principalAmount * this.interestRate * this.tenureMonths) / (12 * 100);
    this.interestEarned = Number(interest.toFixed(2))
    this.finalAmount = Number((this.principalAmount + interest).toFixed(2));
    const processedData = [
      { value: this.principalAmount, name: 'Principal Amount' },
      { value: this.interestEarned, name: 'Interest Earned' },
    ];
    this.updateOptions = {
      series: [
        {
          data: processedData
        },
      ],
    }
    this.calculated = true;
  }

}
