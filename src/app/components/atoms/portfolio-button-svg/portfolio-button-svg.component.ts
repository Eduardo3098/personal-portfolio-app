import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UpperCasePipe} from "@angular/common";

@Component({
  selector: 'portfolio-button-svg',
  templateUrl: './portfolio-button-svg.html',
  styleUrls: ['./portfolio-button-svg.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    UpperCasePipe
  ],
  providers: [MatIconRegistry]
})
export class PortfolioButtonSvgComponent {
  @Input() svgIcon = ''
  @Input() href = ''
  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) {
    this.addSvgIcons(iconRegistry, sanitizer);
  }

  addSvgIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('menu',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/menu.svg'))
      .addSvgIcon('arrow',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/arrow_top_right.svg'))
      .addSvgIcon('dribble',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/dribble.svg'))
      .addSvgIcon('github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/github.svg'))
      .addSvgIcon('instagram',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/instagram.svg'))
      .addSvgIcon('linkedin',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/linkedin3.svg'))
      .addSvgIcon('discord',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/discord.svg'))
      .addSvgIcon('gitter',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/social/gitter.svg'))
  }
}
