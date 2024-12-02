import { Component, ComponentFactoryResolver, createComponent, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WidgetComponentSelection, WidgetSelection } from '../dashboard-widget.model';
import { Device } from '../../../shared/models/data-table.model';
import {MatStep, MatStepperModule} from '@angular/material/stepper';
import { devicesGenerator } from '../../../shared/datagenerator/datagenerator.dev';
import { CustomFormHostDirective } from '../custom-form-host.directive';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Dashboard, Widget } from '../dashboard-types.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CustomForm } from '../forms/custom-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-add-widget',
  standalone: true,
  imports: [CommonModule,MatStepperModule,MatFormFieldModule,
    FormsModule,ReactiveFormsModule,MatSelectModule,MatMenuModule],
  templateUrl: './dashboard-add-widget.component.html',
  styleUrl: './dashboard-add-widget.component.scss'
})
export class DashboardAddWidgetComponent {
  selectWidgetForm!: FormGroup;
  attributesForm!: FormGroup;
  selectedIndex = 0;
  widgets!: WidgetSelection[];
  @ViewChild('widget', {static: true}) widgetStep!: MatStep;
  devices: Device[] = devicesGenerator(10).data.devices;
  selectedDevice!: Device;
  selectedDashboard!: string;
  customForm!: FormGroup;
  @ViewChild(CustomFormHostDirective) container!: CustomFormHostDirective;
  @ViewChild('widgetSelector') matSelect!: MatSelect;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private factoryResolver: ComponentFactoryResolver,
    private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(val => {
      this.selectedDashboard = val['name'];
    });
    this.selectWidgetForm = this.fb.group({
      label: ['', Validators.required],
      component: ['', Validators.required],
      lib: [],
    });
    this.attributesForm = this.fb.group({
      deviceType: ['', Validators.required],
      deviceName: ['', Validators.required],
      attributes: ['', Validators.required],
      dataUnit: ['', Validators.required],
    });
    this.http.get<WidgetSelection[]>('assets/widgets.json').subscribe(val => this.widgets = val);
  }

  selectionChange($event: StepperSelectionEvent) {
    this.selectedIndex = $event.selectedIndex;
    if ($event.selectedIndex === 0) {
      this.selectWidgetForm.enable();
    } else {
      this.selectWidgetForm.disable();
      this.widgetStep.editable = false;
    }

  }

  submit() {
    const newWidget: Widget = {
      ...this.selectWidgetForm.value,
      data: {
        ...this.attributesForm.value,
        ...this.customForm.value,
        deviceId: this.selectedDevice._id
      }
    };
    let a=localStorage.getItem('dashboard');
    if (a){
      const localDash = JSON.parse(a) as Dashboard;
      if (localDash) {
        localDash.widgets.push(newWidget);
        console.log({localDash});
        localStorage.setItem('dashboard', JSON.stringify(localDash));
      } else {
        const newDashBoard: Dashboard = {
          dashboardName: this.selectedDashboard,
          widgets: [newWidget]
        };
        console.log('New Dashboard Stored', {newDashBoard});
        localStorage.setItem('dashboard', JSON.stringify(newDashBoard));
      }
      this.router.navigate(['../'], {
        relativeTo: this.activatedRoute
      });
      // localStorage.setItem('newItem', JSON.stringify(data));
      // console.log(data);
    }

  }

  selectComponent(d: any) {
      let a= this.selectWidgetForm.get('component');
      if(a){  a.setValue(d)  }
  }

  deviceChange(type: Device) {
    this.selectedDevice = type;
  }

  ngAfterViewInit(): void {
    console.log(this.container);
    // import('../forms/guage-form/guage-form.component').then(m => {
    //   const component = m[Object.keys(m)[0]];
    //   const factCompo = this.factoryResolver.resolveComponentFactory(component);
    //   const componentRef = this.container.viewContainerRef.createComponent(factCompo);
    //   this.customForm = componentRef.instance['form'] as FormGroup;
    // });
  }

  loadFormComponent(path: string) {
    import('../forms/' + path).then(m => {
      let lastkey=Object.keys(m).pop();
      let componentClass:any={};
      if(lastkey){   componentClass = m[lastkey];   }
      // const factCompo = this.factoryResolver.resolveComponentFactory<CustomForm>(componentClass);
      this.container.viewContainerRef.clear();
      // add cslee ///to do
      const componentRef = this.container.viewContainerRef.createComponent<CustomForm>(componentClass);
      // const componentRef = this.container.viewContainerRef.createComponent(factCompo);
      // componentRef.changeDetectorRef.detectChanges();
      this.customForm = componentRef.instance.form;
      // this.customForm = this.container.     .instance.form; // componentRef.instance.form; //// to do check
    });
  }

  menuSelected(item: WidgetSelection, lib?: WidgetComponentSelection) {
    if (lib) {
      console.log('Menu with Lib Selected config', {item, lib});
      let a=this.selectWidgetForm.get('lib');
      if (a){a.setValue(lib)}
      // this.selectWidgetForm.get('lib').setValue(lib);
    } else {
      console.log('Single Library config', {item});
      // this.selectWidgetForm.get('lib').setValue(null);
    }
    this.matSelect.placeholder = item.label;
    let a=this.selectWidgetForm.get('component');
    if(a) {a.setValue(item.value)}
    // this.selectWidgetForm.get('component').setValue(item.value);
    this.loadFormComponent(item.componentPath);
  }
}
