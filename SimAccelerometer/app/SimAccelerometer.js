// SimAccelerometer
// Attempts to replicate the Accelerometer API to mock up values for the Fitbit simulator. 
// See https://dev.fitbit.com/build/reference/device-api/accelerometer/ for documentation of this API.
// For use where mock-up data is enough to quickly test features without using the device.

export default function SimAccelerometer(frequency) {
    this.activated = false;
    
    this.x = null;
    this.y = null;
    this.z = null;
    
    this.start = function () { 
      this.activated = true;
      this.onactivate();
      this.reading = setInterval(this.update.bind(this), 1000/(frequency ? frequency.frequency : 100));
    };
    
    this.stop = function() {
      clearInterval(this.reading);
    };
      
    this.update = function() {
      this.timestamp = new Date().getTime();
      this.onreading(); 
    }
    
    this.onreading = function() { return null };
    
    this.onactivate = function() { return null };
    
    this.onerror = function() {
      this.stop();
      this.activated = false;
    };
  };  