function getFileName(email) {
    var cleanEmail = email.replace(/[@\.]/g, "_");
    if (device.platform === 'iOS') {
        return "audio-" + cleanEmail + ".wav";
    } else if (device.platform === 'Android') {
        return "audio-" + cleanEmail + ".amr";
    }
}

var EmployeeView = function(employee) {

    this.initialize = function() {
        console.log('initialize');
        this.$el = $('<div/>');
        this.$el.on('click', '.add-location-btn', this.addLocation);
        this.$el.on('click', '.add-contact-btn', this.addToContacts);
        this.$el.on('click', '.change-pic-btn', this.changePicture);
        this.$el.on('click', '.record-audio-btn', this.recordAudio);
        this.$el.on('click', '.play-audio-btn', this.playAudio);
    };

    this.render = function() {
        this.$el.html(this.template(employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
            function(position) {
                alert(position.coords.latitude + ',' + position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

    this.addToContacts = function(event) {
        event.preventDefault();
        console.console.log('addToContacts');
        if (!navigator.contacts) {
            alert("Contacts API not supported", "Error");
            return;
        }
        var contact = navigator.contacts.create();
        contact.name = {
            givenName: employee.firstName,
            familyName: employee.lastName
        };
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    };

    this.changePicture = function(event) {
        event.preventDefault();
        if (!navigator.camera) {
            alert("Camera API not supported", "Error");
            return;
        }
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Album
            encodingType: 0 // 0=JPG 1=PNG
        };

        navigator.camera.getPicture(
            function(imgData) {
                $('.media-object', this.$el).attr('src', "data:image/jpeg;base64," + imgData);
            },
            function() {
                alert('Error taking picture', 'Error');
            },
            options);

        return false;
    };

	var audioCaptureSuccess = function(mediaFiles) {
	    var i, path, len;
	    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
	        path = mediaFiles[i].fullPath;
	        alert("Saved: " + path);
            $('.play-audio-btn').attr('data-audio-file', path);
	    }
	};

	var audioCaptureError = function(error) {
	    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
	};

    this.recordAudio = function(event) {
        var src = getFileName(employee.email);
        console.log('recordAudio:new Media');
        var mediaRec = new Media(src,
            // success callback
            function() {
                console.log("recordAudio:Saved: " + src);
            },

            // error callback
            function(err) {
                console.log("recordAudio:Error: "+ JSON.stringify(err));
            }
        );

        // Record audio
        mediaRec.startRecord();
        console.log('recordAudio:startRecord');

        // Stop recording after 3 seconds
        setTimeout(function() {
            console.log('recordAudio:stopRecord');
            mediaRec.stopRecord();
            console.log('recordAudio:release');
            mediaRec.release();
            console.log('recordAudio:done');
        }, 3000);

    };

    this.playAudio = function(event) {
        var src = getFileName(employee.email);
        console.log('playAudio:getFileName: ' + src);
        var media = new Media(
            src, 
            function(){
                console.log("playAudio:media success: " + src);
            }, 
            function(err){
                console.log("playAudio:Error. Record an audio for this employee before selecting play. Error mssg: " + JSON.stringify(err));
            }, 
            function(status){
                console.log("playAudio:Status change: " + status);
            });

        console.log('playAudio:play');
        media.play();
        console.log('playAudio:done');
    };

    this.initialize();

};