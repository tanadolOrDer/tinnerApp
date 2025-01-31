import { Component } from '@angular/core'
import { User } from '../../_models/user'

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  member = input.required<User>()
}
