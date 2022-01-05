import { COMMA, ENTER, TAB } from '@angular/cdk/keycodes';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'dv-mat-input',
    templateUrl: './mat_input.component.html',
    styleUrls: ['./mat_input.component.scss']
})
export class DvMatInputComponent implements OnInit, OnChanges {
    myControl = new FormControl();

    @Input() min: number;
    @Input() max: number;
    @Input() step: number;
    @Input() placeholder: string;
    @Input() defaultValue: any;
    @Input() type: string; //number|text|string|textarea|boolean|password
    @Input() icon: string;
    @Input() disabled: boolean;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    @Input() maxlength: number;
    @Input() readonly: boolean;
    @Input() floatLabel = 'auto';
    @Input() textareaMinRows = 1;
    booleanOptions: any[];
    _externalChanged: boolean;
    listValues: any[];

    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, TAB];

    constructor() {
        this.readonly = false;
        this.disabled = false;
        this.type = 'text';
        this.min = null;
        this.max = null;
        this.step = null;
        this._externalChanged = false;
        this.icon = '';
        this.booleanOptions = [
            { value: true, title: 'True' },
            { value: false, title: 'False' }
        ];
        setTimeout(() => {
            //analyze the list type
            this.type = this.type.toLowerCase();
            if (
                this.type.toLowerCase().includes('list') ||
                this.type.toLowerCase().includes('set')
            ) {
                this.type = 'list';
                this.listValues = [];
                if (this.defaultValue) {
                    if (this.defaultValue === 'string') {
                        this.listValues = this.defaultValue.split(',');
                    }
                    if (Array.isArray(this.defaultValue)) {
                        this.listValues = this.defaultValue;
                    }
                }
            }
        });
    }
    ngOnInit() {
        this.myControl.valueChanges.subscribe(value => {
            //if this is external changed, do not emit
            if (!this._externalChanged && this.type === 'number') {
               //if (typeof value === 'number') {
                this.onChange.emit(value);
                // }
            } else if (!this._externalChanged
                && (
                    value && typeof value === 'string' && value.trim().length > 0
                    || value === ''
                )
            ) {
                this.onChange.emit(value.trim());
            } else {
                this._externalChanged = false;
            }
        });
        this.myControl.setValue(this.defaultValue);
    }
    //this is to detect input value change, so as to auto-display
    ngOnChanges(changes: SimpleChanges) {
        if (
            'defaultValue' in changes &&
            !changes.defaultValue.firstChange &&
            (this.type === 'time' || this.type === 'text' || this.type === 'string' || this.type === 'textarea' || this.type === 'number' || this.type === 'password') &&
            changes.defaultValue.currentValue !==
            changes.defaultValue.previousValue
        ) {
            this._externalChanged = true;
            this.myControl.setValue(changes.defaultValue.currentValue);
        }

        if (
            'type' in changes &&
            !changes.type.firstChange &&
            changes.type.currentValue !==
            changes.type.previousValue) {
            this.type = changes.type.currentValue;
        }
    }
    removeListItem(item) {
        this.listValues.splice(this.listValues.indexOf(item), 1);
        this.onChange.emit(this.listValues);
    }
    add(e) {
        if (e) {
            if (e.value) {
                this.listValues.push(e.value);
                this.onChange.emit(this.listValues);
                if (e.input) {
                    e.input.value = '';
                }
            }
        }
    }
    boolChanged(e) {
        this.onChange.emit(e);
    }
    nullify() {
        this.myControl.setValue(null);
    }
    onInputBlur() {
        this.onBlur.emit();
    }
}
