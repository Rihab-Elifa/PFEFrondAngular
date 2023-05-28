import { Component } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule],
})
export class ProfileUserComponent {

}
