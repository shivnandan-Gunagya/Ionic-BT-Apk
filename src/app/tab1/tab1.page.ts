import { Component, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { NavController, NavParams, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  peripheral: any = {};
  statusMessage: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private ble: BLE,
              private toastCtrl: ToastController,
              private ngZone: NgZone) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.onDeviceDisconnected(peripheral)
    );

  }

  onConnected(peripheral:any) {
    this.ngZone.run(() => {
      this.setStatus('');
      this.peripheral = peripheral;
    });
  }

  async onDeviceDisconnected(peripheral:any) {

    const toast = await this.toastCtrl.create({
      message: 'The peripheral unexpectedly disconnected',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
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


  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }

  setStatus(message:any) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}
