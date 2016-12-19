;(function($) {
	$.fn.slideMove = function(opt) {
		settings = $.extend({
			ele : $(window),
			skew : 100
		}, opt);

		return this.each(function() {
			$.fn.extend(this, slideMove);
			this.startx = 0;
			this.starty = 0;
			this.movex = 0;
			this.movey = 0;
			this.count = 1;
			this.offsets = 0;
			this.romew = settings.moveBox.width();
			this.moveBox = settings.moveBox;
			this.keepcount();
			$(this).on("touchstart", this.startFn).on("touchmove", this.moveFn).on("touchend", this.endFn);
		});
	};

	var slideMove = {
		startFn : function(e) {
			this.startx = e.pageX || e.originalEvent.touches[0].pageX;
			this.starty = e.pageY || e.originalEvent.touches[0].pageY;
			this.offsets = offsets = this.moveBox.offset().left;
		},
		moveFn : function(e) {
			this.movex = e.pageX - this.startX || e.originalEvent.touches[0].pageX - this.startx;
			this.movey = e.pageY - this.startY || e.originalEvent.touches[0].pageY - this.starty;
			var winw = $(window).width();

			if (this.offsets <= 0 && this.movex > 0) {
				return;
			} else if (this.offsets >= winw - this.remow && this.movex < 0) {
				return;
			} else if (this.movex) {

			} else {
				this.setMoveBox(this.offsets + this.movex * -1);
			}
		},
		endFn : function() {
			if (Math.abs(this.movex) > 100 && Math.abs(this.movex) > Math.abs(this.movey)) {
				if (this.movex > 0) {
					this.count--;
					if (this.count <= 0) {
						this.count = 0;
					}
				} else {
					this.count++;
					if (this.count > $('.tab').find("ul>li").length - 1) {
						this.count = $('.tab').find("ul>li").length - 1;
					}
				}
				$('.tab').find("ul>li").each(function(i, v) {
					$(v).removeClass('on');
				});
				$('.tab').find("ul>li").eq(this.count).addClass('on');
				this.setMoveBox($('.tab').find("ul>li").eq(this.count).offset().left);
				this.movex=0;
				this.movey=0;
				set_remo();
			} else {
				// this.setMoveBox(this.offsets);
				// alert(2222);
				// set_remo();
			}
		},
		setMoveBox : function(distance) {
			this.moveBox.css({
				'left' : distance + "px"
			});
		},
		keepcount : function() {
			var that = this;
			$('.tab').on("click", "li", function() {
				that.count = $(this).index();
			});
		}
	};
})(jQuery); 