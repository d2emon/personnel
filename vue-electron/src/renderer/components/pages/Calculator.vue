<template>
  <main>
    <div class="header">
      <b-container>
        <div class="calculator">
        <div class="appBox" id="calApp">
          <div class="containerBox">
            <b-row class="btn-row">
              <b-col cols="12" class="cInput">
                <b-form-input v-model="display" type="text" readonly></b-form-input><br>
              </b-col>
            </b-row>
            <b-row class="btn-row">
              <b-col cols="3"><b-btn @click="clear" variant="danger">C</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterOps(4)">÷</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterOps(3)">X</b-btn></b-col>
              <b-col cols="3"><b-btn @click="del"><span class="fa fa-caret-left"></span></b-btn></b-col>
            </b-row>
            <b-row class="btn-row">
              <b-col cols="3"><b-btn @click="enterNum(7)">7</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(8)">8</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(9)">9</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterOps(2)">-</b-btn></b-col>
            </b-row>
            <b-row class="btn-row">
              <b-col cols="3"><b-btn @click="enterNum(4)">4</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(5)">5</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(6)">6</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterOps(1)">+</b-btn></b-col>
            </b-row>
            <b-row class="btn-row">
              <b-col cols="3"><b-btn @click="enterNum(1)">1</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(2)">2</b-btn></b-col>
              <b-col cols="3"><b-btn @click="enterNum(3)">3</b-btn></b-col>
              <b-col cols="3">&nbsp;</b-col>
            </b-row>
            <b-row class="btn-row">
              <b-col cols="3"><b-btn @click="enterNum(0)">0</b-btn></b-col>
              <b-col cols="3"><b-btn @click="addDecimal">.</b-btn></b-col>
              <b-col cols="3">&nbsp;</b-col>
              <b-col cols="3"><b-btn @click="sum">=</b-btn></b-col>
            </b-row>
          </div>
        </div>
        </div>
      </b-container>
    </div>
  </main>
</template>

<script>
export default {
  name: 'calculator',
  data: function () {
    return {
      currentNum: 0,
      decimalAdded: false,
      total: 0,
      prevOps: 0,
      display: ''
    }
  },
  methods: {
    addDecimal: function () {
      if (this.decimalAdded === false) {
        if (this.prevOps !== 0) {
          this.display = '0.'
        } else {
          this.display += '.'
        }
        this.decimalAdded = true
      }
    },
    clear: function () {
      this.currentNum = 0
      this.decimalAdded = false
      this.total = 0
      this.display = ''
      this.prevOps = 0
    },
    del: function () {
      if (this.currentNum > 0) {
        if (this.decimalAdded === false) {
          this.currentNum = parseInt(this.currentNum.toString().slice(0, -1), 10)
        } else {
          this.currentNum = parseFloat(this.currentNum.toString().slice(0, -1))
        }

        if (isNaN(this.currentNum)) {
          this.currentNum = 0
        }
        this.display = this.currentNum
      } else if (this.currentNum === 0) {
        this.display = ''
      }
    },
    enterNum: function (val) {
      if (this.currentNum === 0) {
        if (this.prevOps === 0) {
          this.total = 0
        }

        if (this.decimalAdded === true) {
          this.currentNum = val / 10
          this.display += val.toString()
        } else {
          this.currentNum = val
          this.display = val.toString()
        }
      } else {
        if (this.decimalAdded === true) {
          if (this.currentNum.toString().indexOf('.') === -1) {
            this.currentNum = parseFloat(this.currentNum.toString() + '.' + val.toString())
          } else {
            this.currentNum += val.toString()
            this.currentNum = parseFloat(this.currentNum)
          }
        } else {
          this.currentNum *= 10
          this.currentNum += val
        }
        this.display += val.toString()
      }
    },
    enterOps: function (ops) {
      if (this.total === 0 && this.currentNum === 0) { return }

      if (this.total === 0) {
        this.total += this.currentNum
      }
      switch (this.prevOps) {
        case 1:
          this.total += this.currentNum
          break
        case 2:
          this.total -= this.currentNum
          break
        case 3:
          this.total *= this.currentNum
          break
        case 4:
          this.total /= this.currentNum
          break
        case 0:
          break
      }

      if (this.decimalAdded === true) {
        this.decimalAdded = false
      }
      this.currentNum = 0
      this.prevOps = ops
    },
    sum: function () {
      switch (this.prevOps) {
        case 1:
          this.total += this.currentNum
          break
        case 2:
          this.total -= this.currentNum
          break
        case 3:
          this.total *= this.currentNum
          break
        case 4:
          this.total /= this.currentNum
          break
        case 0:
          break
      }
      this.display = this.total.toString()
      this.prevOps = 0
      this.currentNum = 0
    }
  },
  ready: function () {
    /*
    var target, ink, d, x, y;
    */
    /*
    $(".containerBox .row .cBox").click(function(e) {
      target = $(this);
      //create .ink element if it doesn't exist
      if (target.find(".ink").length == 0)
        target.prepend("<span class='ink'></span>");

      ink = target.find(".ink");
      //incase of quick double clicks stop the previous animation
      ink.removeClass("animate");

      //set size of .ink
      if (!ink.height() && !ink.width()) {
        //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
        d = Math.max(target.outerWidth(), target.outerHeight());
        ink.css({
          height: d,
          width: d
        });
      }

      //get click coordinates
      //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
      x = e.pageX - target.offset().left - ink.width() / 2;
      y = e.pageY - target.offset().top - ink.height() / 2;

      //set the position and add class .animate
      ink.css({
        top: y + 'px',
        left: x + 'px'
      }).addClass("animate");
    })
     */
  }
}
</script>

<style>
.header {
  /* background: #ACD0C0; */
  /* color: #4F6457; */
  height: 100%;
  text-align: center;
  /* padding-top: 10vh; */
}

.calculator {
  width: 310px;
  margin: 0px auto;
}

.header p {
  color: #662E1C;
  font-size: 26px;
  margin: 2.6rem 0;
}

.calculator .appBox {
  /* width: 400px; */
}

.containerBox {
  /* width: 400px; */
  height: auto;
  
  margin: 1px auto;
  padding: 0;

  /* prevent selection of text inside keys */
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
  user-select: none;
}

.btn-row {
  height: 40px;
  /* padding: 0px 15px; */
}

.btn-row .btn {
  width: 55px;
  margin-right: 5px;
}

.btn-row:last .btn {
  margin-right: 0;
}

/* */

.cBox {
  border: 1px solid rgba(95, 95, 95, 0.2);
  cursor: pointer;
  display: inline-block;
  float: none;  
  font-size: 14px;
  overflow: hidden;
  position: relative;
  /* padding: 1.5rem; */
  padding: 0.5rem;
  text-align: center;
  transition: all 0.4s ease;
}

.cBox:hover {
  background: #75B1A9;  
}

.cBox-na:hover {
  background: #ACD0C0 !important;
}

.cInput {
  padding: 0px 15px;  
}

.cInput input {
  text-align: right;
  width: 100%;
  font-size: 14px;
  border: 1px solid rgba(95, 95, 95, 0.2);  
}

.cTop {
  display: inline-block;
  float: none;
  text-align: right;
  font-size: 14px;
  border: 1px solid rgba(95, 95, 95, 0.2);
}

.row-centered {
  text-align:center;
}

/*.ink styles - the elements which will create the ripple effect. The size and position of these elements will be set by the JS code. Initially these elements will be scaled down to 0% and later animated to large fading circles on user click.*/
.ink {
  display: block; position: absolute;
  background: #D9B44A;
  border-radius: 100%;
  transform: scale(0);
}

/*animation effect*/
.ink.animate {animation: ripple 0.3s linear;}
@keyframes ripple {
  /*scale the element to 250% to safely cover the entire link and fade it out*/
  100% {opacity: 0; transform: scale(2.5);}
}
</style>
