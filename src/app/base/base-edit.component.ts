import {OnInit} from '@angular/core';
import {Input, Output, EventEmitter} from '@angular/core';
import {BaseComponent} from './base.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseEntity} from './base-entity.component';
import {BaseService} from './base.service';
import {Messenger} from '../essencial/messenger.service';
import {EMPTY_STRING} from '../essencial/constants/constants';

export class BaseEditComponent<E extends BaseEntity, F, S extends BaseService<E>> extends BaseComponent implements OnInit {

  @Output()
  internalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() entity: E;
  @Input() isEditTabVisible: boolean;
  editForm: FormGroup;



  constructor(private baseEditService: S, private baseEditMessenger: Messenger, private baseEditFormBuilder: FormBuilder) {
    super(baseEditFormBuilder);
  }

  ngOnInit() {
  }


  save() {

    if (!this.isFormValid()) {
      this.baseEditMessenger.showErrorMessage(this.fieldWithErrors);
      return;
    }

    this.baseEditService.save(this.editForm.value)
      .subscribe(data => {
          this.baseEditMessenger.showSuccessMessage('Created');
          this.toggleEditTabVisibility(true);
        },
        err => {
          this.baseEditMessenger.showErrorMessage(err.error);
        });

  }

  update() {
    if (!this.isFormValid()) {
      this.baseEditMessenger.showErrorMessage(this.fieldWithErrors);
      this.fieldWithErrors = EMPTY_STRING;
      return;
    }

    this.baseEditService.update(this.editForm.value).subscribe(data => {
        this.baseEditMessenger.showSuccessMessage('Updated');
        this.toggleEditTabVisibility(false);
      },
      err => {
        this.baseEditMessenger.showErrorMessage(err.error);
      });
  }

  toggleEditTabVisibility(hasNoEntity: boolean): void {
    super.toggleEditVisibility();
    if (hasNoEntity) {
      this.editForm.reset(true);
      this.entity = <E>{};
    }
    if (this.isEditTabVisible) {
      this.internalClose.emit(true);
    }
  }

  isEditMode(): boolean {
    if (this.editForm.get('id').value !== null) {
      return true;
    }
    return false;
  }

}


