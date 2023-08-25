# Ionic-BT-Apk

Steps 

1:- Ionic start bt-apk tabs --type=angular --capacitor.


2:- npm install.


3:- Installing Ionic native BLE npm install @ionic-native/ble .


( If does not work Install peer dependency).


4:- npm install @ionic-native/ble --legacy-peer-deps.


5:- ionic cordova plugin add cordova-plugin-ble-central.

6:- Imported .

import { BLE } from '@ionic-native/ble/ngx';

7:- For further steps followed https://github.com/don/ionic-ble-examples/blob/master/connect/src/pages/home/home.ts.

8:- Important Pages.

i:- **appModule.ts**

ii:- **tab1 page**

iii:- **tab2 page**


