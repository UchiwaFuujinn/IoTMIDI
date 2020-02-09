#include <Wire.h>
#include <MIDIUSB_UF.h>
#include "Adafruit_MCP9808.h"

MIDIUSB_UF_ MidiUSB_UF;
Adafruit_MCP9808 tempsensor = Adafruit_MCP9808();
#define I2CAddress 0x18  //Default
#define MCP9808Sence 3   //分解能

void setup() {
  tempsensor.begin(I2CAddress);
  tempsensor.setResolution(MCP9808Sence);    //9808の初期化
}

void loop() {
  float c;
  tempsensor.wake();
  tempsensor.getResolution();
  c = tempsensor.readTempC(); //温度の読み込み
  MidiUSB_UF.UFsendFLOAT(c);  //温度をPCへ転送
  tempsensor.shutdown_wake(1);
  delay(4000);  //4secごとに測定
}
