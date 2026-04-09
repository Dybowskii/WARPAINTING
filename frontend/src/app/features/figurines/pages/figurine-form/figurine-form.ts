import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import {
  applyWhenValue,
  email,
  form,
  minLength,
  required,
  FormField,
} from '@angular/forms/signals';

type AccountType = 'personal' | 'business';

interface AccountForm {
  accountType: AccountType;
  companyName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-figurine-form',
  imports: [FormField],
  templateUrl: './figurine-form.html',
  styleUrl: './figurine-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FigurineForm {
  protected formModel = signal<AccountForm>({
    accountType: 'personal',
    companyName: '',
    email: '',
    password: '',
  });

  protected form = form(this.formModel, (p) => {
    required(p.accountType);
    required(p.email);
    email(p.email);
    required(p.password);
    minLength(p.password, 8);
    applyWhenValue(
      p,
      (m) => m.accountType === 'business',
      (q) => required(q.companyName),
    );
  });

  protected isBusiness = computed(() => this.form.accountType().value() === 'business');

  protected passwordStrength = computed(() => {
    const v = this.form.password().value();
    return (
      +(v.length >= 8) +
      +(v.match(/[A-Z]/) !== null) +
      +(v.match(/[0-9]/) !== null) +
      +(v.match(/[^A-Za-z0-9]/) !== null)
    );
  });

  protected canSubmit = computed(() => this.form().valid() && this.passwordStrength() >= 3);

  protected submit() {
    if (this.canSubmit()) {
      console.log('Form submitted', this.formModel());
    }
  }
}
