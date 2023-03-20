class AnglePicker {
    constructor(jqui) {
        this.ap = "anglePicker";
        this.jqui = jqui;
        this.options = jqui.options;
    }
    create() {
        this.buildUI();
        this.setupEvents();
        setTimeout(() => {
            this.updateValue(this.options.value);
        }, 1);
        // if (this.options.openOnInit)
        // 	this._open();
    }
    setupEvents() {
        var self = this;
        if (this.controlDiv) {
            this.controlDiv.click(function (e) {
                // console.log("click in gm-control");
                // e.preventDefault();
                //is this opened now, get value here, because it will be different after $(document).trigger('click.ftfontpicker')
                var open = self.controlDiv.hasClass(this.ap + "-open");
                //this is to make sure click is fired for other(and this one) pickers to close
                $(document).trigger('click.anglePicker');
                //this is to prevent form being submitted by input type:image
                // e.stopImmediatePropagation();
                if (open) {
                    self.close();
                }
                else {
                    self.open();
                }
            });
        }
    }
    updateValue(val) {
        //console.log("INXXXX:"+val);
        var angle = this.valueToAngle(val);
        this.value = this.angleToValue(angle);
        //console.log("OUTXXXX:"+this._value);
        angle = this.valueToAngle(val);
        this.h2 = this.options.handleSize / 2;
        this.mx = this.circleDiv.width() / 2;
        this.my = this.mx;
        this.r = this.mx;
        // console.log("xx:"+this.h2+":"+this.mx+":"+this.my+":"+this.r+":val="+val);
        var parentOffset = this.handleDiv.parent().offset();
        if (val === null) {
            this.handleDiv.offset({ left: parentOffset.left + this.mx - this.h2 + 1, top: parentOffset.top + this.my - this.h2 + 1 });
            this.valueDiv.css("opacity", 0);
            return;
        }
        this.valueDiv.css("opacity", 1);
        var rr = this.r + this.options.showValueOffset;
        this.valueDiv.html(val + "°"); // 30 x 20
        if (this.options.showValueEnabled) {
            if (this.options.showValueCenter) {
                this.valueDiv.offset({
                    left: Math.round(parentOffset.left + this.mx - 15 + 1),
                    top: Math.round(parentOffset.top + this.my - 10 + 1)
                });
            }
            else {
                this.valueDiv.offset({
                    left: Math.round(parentOffset.left + rr * Math.cos(angle) + this.mx - 15),
                    top: Math.round(parentOffset.top + rr * Math.sin(angle) + this.my - 10)
                });
            }
        }
        this.handleDiv.offset({
            left: Math.round(parentOffset.left + this.r * Math.cos(angle) + this.mx - this.h2),
            top: Math.round(parentOffset.top + this.r * Math.sin(angle) + this.my - this.h2)
        });
    }
    valueToAngle(val) {
        if (val === null) {
            return null;
        }
        var angle = val * Math.PI / 180;
        if (!this.options.clockwise) {
            angle = -angle;
        }
        angle = angle - this.options.start / 180 * Math.PI * (this.options.clockwise ? -1 : 1);
        //console.log("valueToAngle:"+val+"=>"+angle);
        return angle;
    }
    angleToValue(angle) {
        if (angle === null)
            return null;
        //console.log("angleToValue:"+angle);
        angle = angle + this.options.start / 180 * Math.PI * (this.options.clockwise ? -1 : 1);
        //console.log("angleToValue after offset:"+angle);
        angle = angle * 180 / Math.PI;
        if (this.options.snap) {
            angle = Math.round(angle / this.options.snap) * this.options.snap;
            //console.log("angleToValue aftersnap :"+angle);
        }
        var ret = Math.round(angle * this.dpMultiplier) / this.dpMultiplier;
        ret = ret % 360;
        if (ret < -180) {
            ret += 360;
        }
        else if (ret > 180) {
            ret -= 360;
        }
        if (!this.options.clockwise) {
            ret = -ret;
        }
        //console.log("angleToValue ret :"+ret);
        return ret;
    }
    /** must set this.mx, this.my, this.h2 and this.r before calling */
    updateXY(x, y) {
        //var ret: number[] = [0, 0];
        var angle = Math.atan2(y, x);
        if (this.options.enableCenter) {
            var rr = this.options.centerSize / 2;
            if (x * x + y * y < rr * rr) {
                //ret[0] = this.mx - this.h2 + 1;
                //ret[1] = this.my - this.h2 + 1;
                // console.log("snap val=null:"+x+":"+y+":"+rr);
                this.value = null;
                return; // ret;
            }
        }
        this.value = this.angleToValue(angle);
        // console.log("value:"+this._value);
        //return ret;
    }
    buildUI() {
        var options = this.options;
        var dpm = 1;
        for (var i = 0; i < options.decimalPlaces; i++)
            dpm *= 10;
        this.dpMultiplier = dpm;
        // this.bind("change", options.change);
        this.outerDiv = $("<div class='" + this.ap + "-outer'></div>");
        if (options.flat) {
            this.outerDiv.addClass(this.ap + "-inline");
        }
        else {
            this.outerDiv.addClass(this.ap + "-popup");
        }
        this.controlDiv = $("<div class='" + this.ap + "-control'>FIXME</div>");
        this.topDiv = $("<div class='" + this.ap + "-top'></div>"); // relative
        this.circleDiv = $("<div class='" + this.ap + "-circle'></div>");
        this.centerDiv = $("<div class='" + this.ap + "-center'></div>"); // abs
        this.handleDiv = $("<div class='" + this.ap + "-handle'></div>"); // abs
        this.valueDiv = $("<div class='" + this.ap + "-value'></div>"); //abs
        if (!options.showValueAlwaysEnabled) {
            this.valueDiv.hide();
        }
        //if (!options.showValueEnabled) {
        //}
        this.centerDiv.appendTo(this.topDiv);
        this.circleDiv.appendTo(this.topDiv);
        this.handleDiv.appendTo(this.topDiv);
        this.valueDiv.appendTo(this.topDiv);
        this.topDiv.appendTo(this.outerDiv);
        this.circleDiv.css("width", options.size + "px");
        this.circleDiv.css("height", options.size + "px");
        this.centerDiv.css("width", options.handleSize + "px");
        this.centerDiv.css("height", options.handleSize + "px");
        this.handleDiv.css("width", options.handleSize + "px");
        this.handleDiv.css("height", options.handleSize + "px");
        if (!this.options.enableCenter) {
            this.centerDiv.hide();
        }
        else {
            var hh = this.options.handleSize / 2;
            var mm = this.circleDiv.width() / 2;
            var parentOffset = this.handleDiv.parent().offset();
            this.centerDiv.offset({ left: parentOffset.left + mm - hh + 1, top: parentOffset.top + mm - hh + 1 });
            this.centerDiv.click((evt) => {
                this.updateValue(null);
                this.fireChange();
            });
        }
        this.button1Down = false;
        var mouseMove = (evt) => {
            // console.log("11");
            // if (!this.button1Down && evt.buttons ===1) {
            // 	console.log("trouble");
            // } else if (this.button1Down && evt.buttons === 0) {
            // 	console.log("trouble2");
            // } else {
            // 	console.log("mm");
            // }
            if (this.button1Down) {
                evt.preventDefault();
                // console.log("evt/ui");
                // console.log(evt);
                var x = evt.pageX - this.left - this.mx;
                var y = evt.pageY - this.top - this.my;
                this.updateXY(x, y);
                this.updateValue(this.value);
                this.fireChange();
            }
        };
        var mouseDown = (evt) => {
            this.h2 = this.options.handleSize / 2;
            this.mx = this.circleDiv.width() / 2;
            this.my = this.mx;
            this.r = this.mx;
            this.top = this.circleDiv.offset().top;
            this.left = this.circleDiv.offset().left;
            if (evt.which == 1) {
                this.button1Down = true;
                if (this.options.showValueEnabled)
                    this.valueDiv.show();
                mouseMove(evt);
            }
        };
        var mouseUp = (evt) => {
            if (!this.button1Down)
                return;
            if (evt.which == 1) {
                mouseMove(evt);
                this.button1Down = false;
                if (this.options.showValueEnabled && !options.showValueAlwaysEnabled) {
                    this.valueDiv.hide();
                }
                // console.log("up");
            }
        };
        this.circleDiv.mousedown((evt) => { mouseDown(evt); });
        this.handleDiv.mousedown((evt) => { mouseDown(evt); });
        this.handleDiv.on('touchstart', (evt) => {
            mouseDown(evt.originalEvent.targetTouches[0]);
        });
        this.circleDiv.on('touchstart', (evt) => {
            mouseDown(evt.originalEvent.targetTouches[0]);
        });
        $(document).mousemove((evt) => { mouseMove(evt); });
        $(document).on('touchmove', (evt) => {
            mouseMove(evt.originalEvent.targetTouches[0]);
        });
        $(document).mouseup((evt) => {
            mouseUp(evt);
        });
        $(document).on('touchend', (evt) => {
            mouseUp(evt.originalEvent.changedTouches[0]);
        });
        if (options.flat) {
            this.controlDiv = null;
            this.outerDiv.appendTo(this.jqui.element);
        }
        else {
            this.controlDiv = this.jqui.element;
            this.controlDiv.addClass(this.ap + "-control");
            this.outerDiv.appendTo(this.options.appendTo);
        }
        this.updatePreview();
    }
    updatePreview() {
        // console.log("update preview");
    }
    close() {
        this.outerDiv.removeClass(this.ap + "-open");
        if (this.controlDiv)
            this.controlDiv.removeClass(this.ap + "-open");
    }
    open() {
        this.outerDiv.css("left", this.controlDiv.offset().left + this.controlDiv.width() + 5);
        this.outerDiv.css("top", this.controlDiv.offset().top);
        this.outerDiv.addClass(this.ap + "-open");
        if (this.controlDiv)
            this.controlDiv.addClass(this.ap + "-open");
    }
    fireChange() {
        //console.log("ap:firechange:"+this._value);
        var ui = {
            value: this.value
        };
        this.jqui._trigger("change", null, ui);
    }
    getValue() {
        return this.value;
    }
    setValue(val) {
        // console.log("anglepicker.setValue:" + val);
        this.updateValue(val);
    }
}
AnglePicker.OPTIONS = {
    flat: false,
    value: 0,
    clockwise: true,
    start: 0,
    enableCenter: false,
    showValueCenter: false,
    showValueEnabled: true,
    showValueAlwaysEnabled: false,
    showValueOffset: 25,
    centerSize: 15,
    size: 50,
    handleSize: 10,
    handleType: "default",
    snap: 1,
    showValue: true,
    decimalPlaces: 0,
    appendTo: "body"
};
$(function () {
    $.widget("ui.anglePicker", {
        options: AnglePicker.OPTIONS,
        _create: function () {
            var anglePicker = new AnglePicker(this);
            this.anglePicker = anglePicker;
            anglePicker.create();
        },
        getValue: function () {
            return this.anglePicker.getValue();
        },
        setValue: function (val) {
            this.anglePicker.setValue(val);
        },
        close: function () {
            this.anglePicker.close();
        },
        open: function () {
            this.anglePicker.open();
        }
    });
});
//# sourceMappingURL=anglepicker.js.map
