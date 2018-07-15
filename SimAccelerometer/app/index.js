import SimAccelerometer from "SimAccelerometer";

const accel = new SimAccelerometer( { frequency: 1 } );

accel.start();

accel.onreading = function() {
  console.log("This message should appear at a frequency of 1Hz. Once a second!");  
  console.log("And here is the timestamp: " + accel.timestamp);  
}