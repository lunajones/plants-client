import {OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from './base.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseEditComponent} from './base-edit.component';
import {BaseService} from './base.service';
import {Messenger} from '../essencial/messenger.service';
import {BaseEntity} from './base-entity.component';
import {EMPTY_STRING} from '../essencial/constants/constants';


export class

  BaseListComponent<E extends BaseEntity, F, C, S extends BaseService<E>> extends BaseComponent implements OnInit {

  @ViewChild(BaseEditComponent) editComponent: BaseEditComponent<E, F, S>;
  hasSearched;

  selectedEntity: E;
  oldSelectedEntity: E;

  listForm: FormGroup;
  mainGridList = [];
  currentPage = 1;

  showFilters = true;
  newButtonActive = false;
  clearButtonActive = false;
  searchButtonActive = false;

  constructor(private baseListService: S, private baseListMessenger: Messenger, private baseListFormBuilder: FormBuilder) {
    super(baseListFormBuilder);
  }


  ngOnInit() {
  }

  public searchAll() {
    if (!this.isFormValid()) {
      this.baseListMessenger.showErrorMessage(this.fieldWithErrors);
      this.fieldWithErrors = EMPTY_STRING;
      return;
    }

    this.selectedEntity = <E>{};
    if (this.editVisibility) {
      this.toggleEditTabVisibility();
    }

    this.baseListService.searchAll(this.listForm.value)
      .subscribe(data => {
        this.mainGridList = data;
        this.hasSearched = true;
        this.setSearchButtonActive();
      }, err => this.baseListMessenger.showErrorMessage('Search failed. Bad programming. Report this bug to admin.' + err.error));
  }

  remove(item: E) {
    if (this.editVisibility) {
      this.toggleEditTabVisibility();
    }
    this.baseListService.remove(item.id)
      .subscribe(data => {
          this.baseListMessenger.showSuccessMessage('Removed');
          this.searchAll();
          this.hasSearched = true;
        },
        err => {
          this.baseListMessenger.showErrorMessage(err.error);
        });
  }

  onSelect(selectedEntity: E): void {
    this.oldSelectedEntity = this.selectedEntity;
    this.selectedEntity = selectedEntity;

    if (JSON.stringify(this.selectedEntity) !== JSON.stringify(this.oldSelectedEntity)) {
      this.editVisibility = true;
    } else if (JSON.stringify(this.selectedEntity) !== JSON.stringify(this.oldSelectedEntity)) {
      this.toggleEditTabVisibility();
    } else if (JSON.stringify(this.selectedEntity) === JSON.stringify(this.oldSelectedEntity)) {
      this.editVisibility = false;
    }
  }

  clear(): void {
    this.selectedEntity = <E>{};

    if (this.editVisibility) {
      super.toggleEditVisibility();
    }
    this.listForm.reset();
    this.listForm.setErrors({ 'invalid': false });
    this.mainGridList = [];
    this.hasSearched = false;
    this.setClearButtonActive();
  }

  toggleEditTabVisibility() {
    if (JSON.stringify(this.selectedEntity) === JSON.stringify(this.oldSelectedEntity)) {
      this.oldSelectedEntity = this.selectedEntity;
      this.selectedEntity = undefined;
    }
    super.toggleEditVisibility();
  }

  setNewButtonActive() {
    if (JSON.stringify(this.selectedEntity) === JSON.stringify({}) || JSON.stringify(this.selectedEntity) === undefined) {
      super.toggleEditVisibility();
    }
    this.oldSelectedEntity = this.selectedEntity;
    this.selectedEntity = <E>{};
    this.newButtonActive = true;
    this.clearButtonActive = false;
    this.searchButtonActive = false;
  }

  setClearButtonActive() {
    this.showFilters = true;
    this.newButtonActive = false;
    this.clearButtonActive = true;
    this.searchButtonActive = false;
  }

  setSearchButtonActive() {
    this.showFilters = false;
    this.newButtonActive = false;
    this.clearButtonActive = false;
    this.searchButtonActive = true;
  }

  isFilterVisible() {
    if (!this.hasSearched) {
      return true;
    } else if (this.hasSearched && !this.showFilters) {
      return false;
    }
    return true;
  }

  onFilterOpen() {
    this.showFilters = true;
  }

}
