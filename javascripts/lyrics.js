function Lyrics(typingSpeed) {
    this.unicodeRange = [0x00BF, 0x02B8];
    this.typingSpeed = typingSpeed | 40;
}

Lyrics.prototype.print = function(line) {
    var self = this;

    // var seq;
    var outputString = "";

    var timer = new Tock({
        countdown: true,
        complete: function() {
            var targetObj = document.getElementById("script");
            var translateObj = document.getElementById("translate");

            targetObj.innerHTML = "";
            translateObj.innerHTML = "";

            // Set background color
            var rand = Math.random();
            var backgroundColor = "white";
            var fontColor = "#333";
            var translateColor = "#666";

            if(rand >= 0.25) {
                backgroundColor = "black";
                fontColor = "#fff";
                translateColor = "#777";
            }

            document.body.style.backgroundColor = backgroundColor;
            targetObj.style.color = fontColor;
            translateObj.style.color = translateColor;

            for (var j = 0; j < line.string.length * 1.5; j++) {
                outputString += String.fromCharCode(self.unicodeRange[0] + Math.random() * (self.unicodeRange[1] - self.unicodeRange[0] + 1));
            }

            var seq = 0;
            var printer = setInterval(function() {
                targetObj.innerHTML += outputString[seq++];

                if (seq > outputString.length) {
                    clearInterval(printer);
                    if(line.string != "") {
                        targetObj.innerHTML = "《" + line.string + "》";
                    }else{
                        targetObj.innerHTML = line.string;
                    }
                    translateObj.innerHTML = line.korean;
                }
            }, self.typingSpeed);
        }
    }).start(line.timing);
};
