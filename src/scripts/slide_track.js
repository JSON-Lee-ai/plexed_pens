const track = document.getElementById("image-track");
const slide = document.getElementById("slide");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;


const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  if (isNaN(track.dataset.percentage)) track.dataset.percentage = 0;
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

slide.onmousedown = e => handleOnDown(e);

slide.ontouchstart = e => handleOnDown(e.touches[0]);

slide.onmouseup = e => handleOnUp(e);

slide.ontouchend = e => handleOnUp(e.touches[0]);

slide.onmousemove = e => handleOnMove(e);

slide.ontouchmove = e => handleOnMove(e.touches[0]);