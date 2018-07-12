import { Accelerometer } from "accelerometer";
import { me as device } from "device";
import { display } from "display";
import document from "document";

const screen = {
  width: device.screen.width,
  height: device.screen.height,
  midX: device.screen.width/2,
  midY: device.screen.height/2,
};

const bowl = document.getElementById("bowl");
const soup = document.getElementById("soup");
const fps = document.getElementById("fps");
const accel = new Accelerometer({ frequency: 40 });

const init = () => {
  display.autoOff = false;
  display.on = true;
  
  bowl.r = 122; // Radius of bowl
  
  soup.firstChild.r = 90; // Radius of soup
  soup.posX = 0;
  soup.posY = 0;
  soup.maxScaleY = 0.5; // Value of soup-scaling compression along y-axis at bowl edge
  soup.maxScaleX = 0.2; // Value of soup-scaling extension along x-axis at bowl edge
  soup.groupTransform.translate.x = screen.midX;
  soup.groupTransform.translate.y = screen.midY;
};

const moveSoup = (accel) => {
  
  // Check if movement keeps inside the bowl
  if ( distFromCenter(soup.posX + accel.x, soup.posY - accel.y) < bowl.r ) {
    soup.groupTransform.translate.x -= accel.x;
    soup.groupTransform.translate.y += accel.y;
  };

};

const scaleSoup = (dist) => {
  soup.groupTransform.scale.x = 1 - ( dist*(soup.maxScaleY/bowl.r) ); // Compress
  soup.groupTransform.scale.y = 1 + ( dist*(soup.maxScaleX/bowl.r) ); // Extend
};

const rotateSoup = (y, x) => {
  const deg = Math.atan2( y, x ) * (180/Math.PI);
  if (deg < 0) { deg += 360 };
  
  soup.groupTransform.rotate.angle = deg;
};
  
const distFromCenter = (x, y) => {
  return Math.sqrt( (x*x) + (y*y) );
};

init();
accel.start();

accel.onreading = function() {    
  soup.posX = screen.midX - soup.groupTransform.translate.x;
  soup.posY = screen.midY - soup.groupTransform.translate.y;
  
  const dist = distFromCenter(soup.posX, soup.posY);
  
  moveSoup(accel);
  rotateSoup(soup.posY, soup.posX);
  scaleSoup(dist);
  
  // Display framerate
  fps.current = accel.timestamp - (fps.last || 0);
  fps.last = accel.timestamp;
  fps.text = 1/(fps.current*0.001) + "fps";
}
