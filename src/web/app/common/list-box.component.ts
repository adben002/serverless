import {Component, Input} from '@angular/core';

@Component({
    selector: 'list-box',
    template: `
        <input type="text" (click)="addValue($event)">
        <fieldset>
            <span *ngFor="let value of values; let i = index" (click)="removeValue(i)">
                {{value}}
            </span>
        </fieldset>
    `
})
export class ListBoxComponent {

    @Input()
    private values: Array<any>;

    addValue(event: any) {
        let value = event.target.value;
        if (value !== '') {
            this.values.push(value);
            event.target.value = '';
        }
    }

    removeValue(index: number) {
        this.values.splice(index, 1);
    }

}
