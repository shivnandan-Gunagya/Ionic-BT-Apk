import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { NavController, ToastController } from '@ionic/angular';
import {NgModel} from '@angular/forms'

import {Tab1Page} from '../tab1/tab1.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  devices: any[] = [];
  statusMessage: any;

  constructor(public navCtrl: NavController, 
              private toastCtrl: ToastController,
              private ble: BLE,
              private ngZone: NgZone) { 
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device:any) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  async scanError(error: any) {
    this.setStatus('Error ' + error);
  
    const toast = await this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
  
    toast.present();
  }

  setStatus(message:any) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device: any) {
    console.log(JSON.stringify(device) + ' selected');
    this.navCtrl.navigateForward('/tabs/tab1', { state: { device } });
  }

}
