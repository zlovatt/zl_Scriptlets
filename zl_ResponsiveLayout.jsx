(function responsiveLayout (thisObj) {
	function responsiveUI (thisObj) {
		this.thisObj = thisObj;
		this.init();
	}

	responsiveUI.prototype = {
		defaultSize : [100, 32],
		margin      : 5,

		init : function () {
			this.win = (this.thisObj instanceof Panel) ? this.thisObj : new Window('palette', 'Responsive Palette', undefined, {resizeable:true});

			var btnGrp = this.win.add('group', undefined, undefined, {alignment: 'fill'});
				btnGrp.add('button', undefined, 'a');
				btnGrp.add('button', undefined, 'b');
				btnGrp.add('button', undefined, 'c');
				btnGrp.add('button', undefined, 'd');

				var smallButton = btnGrp.add('button', undefined, 'e');
				smallButton.size = [20, this.defaultSize[1]];

			this.initBtnSizes(btnGrp);
			this.initLayout();
		},

		initBtnSizes : function (btnGrp) {
			for (var i = 0, il = btnGrp.children.length; i < il; i++) {
				var btn = btnGrp.children[i];
				if (typeof btn.size === 'undefined')
					btn.size = this.defaultSize;
			}
		},

		initLayout : function () {
			var padding = this.margin * 2,
				btnGrp = this.win.children[0],
				me = this;

			this.win.size = this.getWinSize(btnGrp);
			this.adjustButtons(this.win, btnGrp);

			var largestSize = this.getLargestSize(btnGrp);

			this.win.onResizing = this.win.onResize = function () {
				if (me.win.size.width < largestSize[0] + padding)
					me.win.size.width = largestSize[0] + padding;
				if (me.win.size.height < largestSize[1] + padding)
					me.win.size.height = largestSize[1] + padding;

				me.adjustButtons(me.win, btnGrp);
			};
		},

		adjustButtons : function (win, btnGrp) {
			var margin = this.margin,
				startPoint = [margin, margin];

			btnGrp.bounds = [
								0, 0,
								win.windowBounds.width + startPoint[0],
								win.windowBounds.height + startPoint[1],
							];

			for (var i = 1, il = btnGrp.children.length; i < il; i++) {
				var lastBtn = btnGrp.children[i - 1],
					btn = btnGrp.children[i];

				var offsetAmt = [
									lastBtn.size[0] + margin,
									lastBtn.size[1] + margin
								];

				lastBtn.location = startPoint;
				startPoint[0] += offsetAmt[0];

				if (win.size[0] < (startPoint[0] + btn.size[0] + margin)) {
					startPoint[0] = margin;
					startPoint[1] += offsetAmt[1];
				}
			}

			btnGrp.children[btnGrp.children.length - 1].location = startPoint;
		},

		getLargestSize : function (btnGrp) {
			var largestX = 0,
				largestY = 0;

			for (var i = 0, il = btnGrp.children.length; i < il; i++) {
				var btn = btnGrp.children[i];
				if (btn.size[0] > largestX)
					largestX = btn.size[0];
				if (btn.size[1] > largestY)
					largestY = btn.size[1];
			}

			return [largestX, largestY];
		},

		getWinSize : function (btnGrp) {
			var largestSize = this.getLargestSize(btnGrp),
				numButtons = btnGrp.children.length,
				sizeX = 0,
				sizeY = largestSize[1];

			for (var i = 0, il = btnGrp.children.length; i < il; i++) {
				var btn = btnGrp.children[i];
				sizeX += btn.size[0];
			}

			sizeX += this.margin * (numButtons + 1);
			sizeY += this.margin * 2;

			return [sizeX, sizeY];
		},

		show : function () {
			if (this.win instanceof Window) {
				this.win.center();
				this.win.show();
			} else {
				this.win.layout.layout(true);
				this.win.layout.resize();
			}
		},

		close : function () {
			this.win.close();
		}
	};

	var ui = new responsiveUI(thisObj);
	ui.show();
})(this);
