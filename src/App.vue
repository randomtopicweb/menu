<template>

  <body>
    <!-- <ul class="nav">
  <li @click="step = 0">홈</li>
  <li @click="step = 1">메뉴선택</li>
  <button @click="step = 2">비교</button>
</ul> -->
    <div v-if="step == 0">

      <div
        class="black-bg"
        v-if="모달창 == true"
      >
        <div class="white-bg">
          메뉴선택은<br>
          이렇게 <br>
          전체를 선택해서 하거나 <br>
          전체를 해제한 상태에서 하거나 <br>
          고른 메뉴중에서 랜덤으로 뽑아보세요 <br>
          랜덤으로 정해진 메뉴를 지도에서 확인해보세요 <br>
        </div>
      </div>
      <div class="homeDiv">
        <div
          class="Logo"
          @click="step = 1"
        >음식 메뉴 고를때</div>
        <div
          class="Logo"
          @click="step = 1"
        >대화 주제 고를때 (출시예정)</div>

      </div>

    </div>
    <div v-if="step == 1">
      <div class="menuChoice">
        <button
          class="homeButton"
          @click="step = 0"
        >Home</button>
        <button
          class="bottomButton"
          @click="toFloor"
        >▼</button>

        <div
          class="black-bg"
          v-if="모달창 == true"
        >
          <div @click="modal()"></div>
          <div class="white-bg">
            <button
              class="closeButton"
              @click="모달창 = false"
            >X</button>
            <h1 v-if="checked.length < 1">최소 한 개 이상의 메뉴를 선택해주세요</h1>
            <div
              class="randomResult"
              v-if="checked.length > 0"
            >

              <h4 class="random">선택한 음식 중에서 랜덤으로 나온 메뉴:</h4>
              <h1 class="random">{{random}}</h1>
              <a
                class="random"
                :href="`https://map.naver.com/v5/search/${random}`"
                target="_blank"
                rel="noopener noreferrer"
              >{{random}}가게 지도에서 보기</a>
              <button
                class="rechoice"
                @click=" check();  makeRandom();"
              > 다시 선택</button>
            </div>

          </div>

        </div>

        <div class="box">
          <button
            @click="change"
            :class="{'customTop':category === 0,'clickedTop':category === 1}"
          >전체</button>
        </div>

        <!-- <div>{{foods[0].id}}</div> -->
        <div class="box">
          <button
            @click="changeSnackfood"
            :class="{'customTop':snackfood_s.includes(0) === true,'clickedTop':categorySnackfood === 1 || snackfood_s.includes(0) === false}"
          >분식류</button>
          <div class="snackfood">
            <button
              v-for="(음식,i) in snackfood"
              :key="i"
              @click="sns = i; snackfoodChange()"
              :class="{'custom':snackfood_s[i] === 0,'clicked':snackfood_s[i] === 1}"
            >{{snackfood[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeRice"
            :class="{'customTop':rice_s.includes(0) === true,'clickedTop':categoryRice === 1 || rice_s.includes(0) === false}"
          >밥 종류</button>
          <div class="rice">
            <button
              v-for="(음식,i) in rice"
              :key="i"
              @click="rs = i; riceChange()"
              :class="{'custom':rice_s[i] === 0,'clicked':rice_s[i] === 1}"
            >{{rice[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeNoodle"
            :class="{'customTop':noodle_s.includes(0) === true,'clickedTop':categoryNoodle === 1 || noodle_s.includes(0) === false}"
          >면 종류</button>
          <div class="noodle">
            <button
              v-for="(음식,i) in noodle"
              :key="i"
              @click="ns = i; noodleChange()"
              :class="{'custom':noodle_s[i] === 0,'clicked':noodle_s[i] === 1}"
            >{{noodle[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeSoup"
            :class="{'customTop':soup_s.includes(0) === true,'clickedTop':categorySoup === 1 || soup_s.includes(0) === false}"
          >탕/찌개</button>
          <div class="soup">
            <button
              v-for="(음식,i) in soup"
              :key="i"
              @click="ss = i; soupChange()"
              :class="{'custom':soup_s[i] === 0,'clicked':soup_s[i] === 1}"
            >{{soup[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeMeat"
            :class="{'customTop':meat_s.includes(0) === true,'clickedTop':categoryMeat === 1 || meat_s.includes(0) === false}"
          >고기 종류</button>
          <div class="meat">
            <button
              v-for="(음식,i) in meat"
              :key="i"
              @click="ms = i; meatChange()"
              :class="{'custom':meat_s[i] === 0,'clicked':meat_s[i] === 1}"
              :color="{'blue':meat_s[i] === 0,'yellow':meat_s[i] === 1}"
            >{{meat[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeBread"
            :class="{'customTop':bread_s.includes(0) === true ,'clickedTop':categoryBread === 1 || bread_s.includes(0) === false}"
          >빵 종류</button>
          <div class="bread">
            <button
              v-for="(음식,i) in bread"
              :key="i"
              @click="bs = i; breadChange()"
              :class="{'custom':bread_s[i] === 0,'clicked':bread_s[i] === 1}"
            >{{bread[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeSeafood"
            :class="{'customTop':seafood_s.includes(0) === true,'clickedTop':categorySeafood === 1 || seafood_s.includes(0) === false}"
          >해산물</button>
          <div class="seafood">
            <button
              v-for="(음식,i) in seafood"
              :key="i"
              @click="sfs = i; seafoodChange()"
              :class="{'custom':seafood_s[i] === 0,'clicked':seafood_s[i] === 1}"
            >{{seafood[i]}}</button>
          </div>
        </div>

        <div class="box">
          <button
            @click="changeAbroad"
            :class="{'customTop':abroad_s.includes(0) === true ,'clickedTop':categoryAbroad === 1 || abroad_s.includes(0) === false }"
          >기타해외음식</button>
          <div class="abroad">
            <button
              v-for="(음식,i) in abroad"
              :key="i"
              @click="abs = i; abroadChange()"
              :class="{'custom':abroad_s[i] === 0,'clicked':abroad_s[i] === 1}"
            >{{abroad[i]}}</button>
          </div>
        </div>

        <!-- <p>{{cs}}</p>
   <p>{{meat_c[cs]}}</p>
   <p>{{meat[cs]}}</p> -->

        <!-- 랜덤선택 -->
        <!-- <p>{{checked}}</p> -->

        <!-- <div class="randomResult" v-if="checked.length > 0" >
    <h4 class="random">당신이 고른 음식 중에서 랜덤으로 나온 메뉴:  </h4>
    <h1 class="random">{{random}}</h1>
    <a class="random" :href="`https://map.naver.com/v5/search/${random}`" target="_blank" rel="noopener noreferrer">{{random}}가게 지도에서 보기</a>
   </div> -->

        <button
          class="randomButton"
          @click=" check();  makeRandom(); modal();"
        > 랜덤 선택</button>

        <!-- 코드 출력부분 -->

        <!-- <a class="waves-effect waves-light btn-small" @click.prevent="codify();copy();modal()" >{{string}}</a> -->

      </div>
    </div>
    <div v-if="step == 3">
      <div class="input">

        <!-- <p>{{Number(userData[0])}}</p> -->

        <!-- 코드 입력부분 -->

        <div
          v-for="(인풋,i) in inputLength"
          :key="i"
        >
          <input v-model="userInput[i]"><button @click=" input_s = i; toBin(); inputToData(); addNumber(); userDataToMeat_c(); ">입력</button>
        </div>

        {{input_s}}
        {{numberBin}}
        {{userData}}

        <button @click="inspectionSet();inspection();noNull();divide();">{{userDataMulti}}</button>
        <h2>{{userDataMultiDivided}}</h2>

        <!-- <button @click="addNumber(); ">유저데이터 0 들어가게</button>
    <button @click="userDataToMeat_c();">데이터 바꿔줘</button> -->

        <!-- <p>{{userData.unshift("1")}}</p> -->

        <button @click="compare(); compareUpdate(); checkB();">비교</button>
        <h5>{{comparison}}</h5>
        <h5>{{checkedB}}</h5>

        <div
          v-for="(메뉴,i) in checkedB"
          :key="i"
        >{{checkedB[i]}}</div>

      </div>
    </div>

    <!-- <container class="footer">
  <p @click="step = 0">홈</p>
  <p @click="step = 1">메뉴선택</p>
  <button @click="step = 2">비교</button>
</container> -->
  </body>

  <router-view>

  </router-view>

  <div class="ad">
    <p>광고</p>
  </div>

</template>
<script>

import foods from './assets/data';
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

  data () {
    return {

      step: 0,

      모달창: false,

      selected: 0,
      inputLength: 5,

      numberBin: [],
      input_s: 0,


      userInput: [],
      userData: [],
      userDataMulti: [],
      userDataMultiDivided: [],

      string: "0",

      category: 0,

      categoryMeat: 0,
      categorySoup: 0,
      categoryNoodle: 0,
      categoryRice: 0,
      categoryBread: 0,
      categoryAbroad: 0,
      categorySeafood: 0,
      categorySnackfood: 0,



      ms: 0,
      ss: 0,
      ns: 0,
      rs: 0,
      bs: 0,
      abs: 0,
      sfs: 0,
      sns: 0,

      arr: [],
      arr_s: [],

      meat: foods[0].subMenu,
      soup: foods[1].subMenu,
      noodle: foods[2].subMenu,
      rice: foods[3].subMenu,
      bread: foods[4].subMenu,
      abroad: foods[5].subMenu,
      seafood: foods[6].subMenu,
      snackfood: foods[7].subMenu,

      meat_s: foods[0].state,
      soup_s: foods[1].state,
      noodle_s: foods[2].state,
      rice_s: foods[3].state,
      bread_s: foods[4].state,
      abroad_s: foods[5].state,
      seafood_s: foods[6].state,
      snackfood_s: foods[7].state,


      // subMenuAll: [this.meat,this.soup,this.noodle,this.rice,this.bread,this.abroad,this.seafood],
      // stateAll: [this.meat_s,this.soup_s,this.noodle_s,this.rice_s,this.bread_s,this.abroad_s,this.seafood_s],

      // subMenuAll: this.arr.push(this.meat,this.soup,this.noodle,this.rice,this.bread,this.abroad,this.seafood),
      // stateAll: this.arr_s.push(this.meat_s,this.soup_s,this.noodle_s,this.rice_s,this.bread_s,this.abroad_s,this.seafood_s),

      subMenuAll: [],
      stateAll: [],


      bin: parseInt(this.string, 2),
      checked: [],


      comparison: [],
      checkedB: [],

      random: ""
    }
  },

  updated () {

    this.subMenuAll = this.meat.concat(this.soup, this.noodle, this.rice, this.bread, this.seafood, this.abroad, this.snackfood,);
    this.stateAll = this.meat_s.concat(this.soup_s, this.noodle_s, this.rice_s, this.bread_s, this.seafood_s, this.abroad_s, this.snackfood_s,)
  },



  methods: {
    // 데이터 합치기


    //상위메뉴
    change () {
      if (this.category === 0) { this.category = 1; this.meat_s.fill(1); this.soup_s.fill(1); this.noodle_s.fill(1); this.rice_s.fill(1); this.bread_s.fill(1); this.bread_s.fill(1); this.abroad_s.fill(1); this.seafood_s.fill(1); this.snackfood_s.fill(1); }
      else { this.category = 0; this.meat_s.fill(0); this.soup_s.fill(0); this.noodle_s.fill(0); this.rice_s.fill(0); this.bread_s.fill(0); this.bread_s.fill(0); this.abroad_s.fill(0); this.seafood_s.fill(0); this.snackfood_s.fill(0); }
    },

    changeMeat () {
      if (this.meat_s.includes(0) === true) { this.categoryMeat = 1; this.meat_s.fill(1) }
      else { this.categoryMeat = 0; this.meat_s.fill(0) }
    },
    changeSoup () {
      if (this.soup_s.includes(0) === true) { this.categorySoup = 1; this.soup_s.fill(1) }
      else { this.categorySoup = 0; this.soup_s.fill(0) }
    },
    changeNoodle () {
      if (this.noodle_s.includes(0) === true) { this.categoryNoodle = 1; this.noodle_s.fill(1) }
      else { this.categoryNoodle = 0; this.noodle_s.fill(0) }
    },
    changeRice () {
      if (this.rice_s.includes(0) === true) { this.categoryRice = 1; this.rice_s.fill(1) }
      else { this.categoryRice = 0; this.rice_s.fill(0) }
    },
    changeBread () {
      if (this.bread_s.includes(0) === true) { this.categoryBread = 1; this.bread_s.fill(1) }
      else { this.categoryBread = 0; this.bread_s.fill(0) }
    },
    changeAbroad () {
      if (this.abroad_s.includes(0) === true) { this.categoryAbroad = 1; this.abroad_s.fill(1) }

      else { this.categoryAbroad = 0; this.abroad_s.fill(0) }
    },
    changeSeafood () {
      if (this.seafood_s.includes(0) === true) { this.categorySeafood = 1; this.seafood_s.fill(1) }
      else { this.categorySeafood = 0; this.seafood_s.fill(0) }
    },

    changeSnackfood () {
      if (this.snackfood_s.includes(0) === true) { this.categorySnackfood = 1; this.snackfood_s.fill(1) }
      else { this.categorySnackfood = 0; this.snackfood_s.fill(0) }
    },

    //하위메뉴  
    meatChange () {
      if (this.meat_s[this.ms] === 0) { this.meat_s[this.ms] = 1 } else { this.meat_s[this.ms] = 0 }
    },
    soupChange () {
      if (this.soup_s[this.ss] === 0) { this.soup_s[this.ss] = 1 } else { this.soup_s[this.ss] = 0 }
    },
    noodleChange () {
      if (this.noodle_s[this.ns] === 0) { this.noodle_s[this.ns] = 1 } else { this.noodle_s[this.ns] = 0 }
    },
    riceChange () {
      if (this.rice_s[this.rs] === 0) { this.rice_s[this.rs] = 1 } else { this.rice_s[this.rs] = 0 }
    },
    breadChange () {
      if (this.bread_s[this.bs] === 0) { this.bread_s[this.bs] = 1 } else { this.bread_s[this.bs] = 0 }
    },
    abroadChange () {
      if (this.abroad_s[this.abs] === 0) { this.abroad_s[this.abs] = 1 } else { this.abroad_s[this.abs] = 0 }
    },
    seafoodChange () {
      if (this.seafood_s[this.sfs] === 0) { this.seafood_s[this.sfs] = 1 } else { this.seafood_s[this.sfs] = 0 }
    },
    snackfoodChange () {
      if (this.snackfood_s[this.sns] === 0) { this.snackfood_s[this.sns] = 1 } else { this.snackfood_s[this.sns] = 0 }
    },

    check () {
      for (var i = 0; i < this.stateAll.length; i++) {
        if (this.stateAll[i] === 1) { this.checked = this.checked.filter((element) => element !== this.subMenuAll[i]); this.checked.push(this.subMenuAll[i]) }
        else { this.checked = this.checked.filter((element) => element !== this.subMenuAll[i]) }
      }
      // if (this.meat_c[1] === 1) 
      // { this.checked = this.checked.filter((element) => element !== this.meat[1]); this.checked.push(this.meat[1])  } 
      // else { this.checked = this.checked.filter((element) => element !== this.meat[1])} 
    },



    makeRandom () {
      this.random = this.checked[Math.floor(Math.random() * (this.checked.length))]
    },

    copy () {
      navigator.clipboard.writeText(this.string)
    },

    modal () {
      this.모달창 = true;
    },




    toFloor () {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@500&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  margin-bottom: 15vh;
  padding: 0;
  height: auto;
  width: 100%;
  background-color: #fff;
  font-family: "Noto Sans KR", sans-serif;
}

button {
  margin: 5px 5px;
  /* font-family: 'Jua', sans-serif; */
  font-family: "Noto Sans KR", sans-serif;
  font-size: large;
  background: white;
  color: red;

  /* background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer */
}

.homeDiv {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;

  margin-top: 5vh;
  margin-bottom: 5vh;
}

.Logo {
  background-color: #f25757;
  border: 2px solid #f25757;
  height: 250px;
  width: 250px;
  border-radius: 20px;
  margin-bottom: 10vh;
  cursor: pointer;
}

.homeMenu {
  background-color: #f25757;
  border: 2px solid #f25757;
  border-radius: 20px;
  box-shadow: #f25757 0px 0px 4px 0px;
  margin-bottom: 5vh;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 30px;
  padding: 0 10px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.font10 {
  font-size: 10px;
}

.clicked {
  /* background: #FF0080; color: white; */
  background-color: #f25757;
  border: 2px solid #f25757;
  border-radius: 20px;
  /* box-shadow: #f25757 0px 0px 4px 0px; */
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 2.4vh;
  padding: 0 1.4vh;
  line-height: 7vh;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.custom {
  /* background: white; color: red; */

  background-color: #fff;
  border: 2px solid #f25757;
  border-radius: 20px;
  /* box-shadow: #422800 4px 4px 0 0; */
  color: #f25757;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 2.4vh;
  padding: 0 1.4vh;
  line-height: 7vh;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.clickedTop {
  margin-bottom: 20px;
  /* background: #FF0080; color: white; */
  background-color: #f25757;
  border: 0.8vh solid #f25757;
  border-radius: 15px;
  /* box-shadow: #f25757 0px 0px 4px 0px; */
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 3.5vh;
  padding: 2vh;
  line-height: 4vh;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.customTop {
  /* background: white; color: red; */

  margin-bottom: 20px;
  background-color: #fff;
  border: 0.8vh solid #f25757;
  border-radius: 15px;
  /* box-shadow: #422800 4px 4px 0 0; */
  color: #f25757;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 3.5vh;
  padding: 2vh;
  line-height: 4vh;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.custom:hover,
.customTop:hover {
  background-color: #f2b6a0;
}

div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

a {
  text-decoration: none;
  outline: none;
}

/* CSS */

/* @media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
} */

/* button {background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer} */

/* .menuChoice {
  scroll-snap-type: y mandatory;
} */

.box {
  margin: 50px 50px;
  padding: 10px 10px;
  scroll-snap-align: center;
  /* border: 1px solid #F25757;
  border-radius: 5%; */
}

.footer {
  position: fixed;

  bottom: 4vh;
}
.footer button {
  background-color: #fff;
  border: 2px solid #422800;
  border-radius: 30px;
  /* box-shadow: #422800 4px 4px 0 0; */
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 25px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  width: 45%;

  box-shadow: none;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
}

.homeButton {
  top: 5%;
  left: 90%;

  position: sticky;
  color: whitesmoke;
  background-color: #f25757;
}

.bottomButton {
  top: 75%;
  left: 90%;
  width: 5vh;
  height: 5vh;
  border-color: rgb(253, 242, 232);
  border-radius: 30px;
  background-color: rgb(253, 242, 232);

  position: fixed;
  color: #f25757;
}

.nav {
  float: right;
}

li {
  right: 50%;
  border: 1px solid #f25757;

  display: inline;
}

.randomButton {
  /* background: white; color: red; */

  background-color: #fff;
  border: 10px solid #fa9e49ce;
  border-radius: 100px;
  box-shadow: #422800 5px 5px 0 0;
  color: #fa9e49ce;
  cursor: pointer;
  display: inline-block;
  font-weight: 10px;
  font-size: 5vh;
  padding: 10px 10px;
  line-height: 40px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  transform: translate(-50%);
  position: relative;
  left: 50%;
  bottom: 0;
}

.random {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 4vh;

  font-size: 2vh;
}

.randomResult h1 {
  font-size: 3.5vh;
  border: solid 2px #f25757;
  padding: 1vh;
}

.randomResult a {
  font-size: 2vh;
  color: #f25757;
}

.randomButton:active {
  box-shadow: #f25757 2px 2px 0 0;
  transform: translate(-49%, 1%);
}

.closeButton {
  position: relative;
  top: 0;
  left: 90%;
  color: #f25757;
  width: 4.2vh;
  height: 4.2vh;
  font-size: 2.5vh;
  text-align: center;

  background-color: whitesmoke;
  border-color: #f25757;
  border-radius: 25%;
  /* float: right;
  display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: flex-end;
	align-content: flex-start; */
}

.rechoice {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-55%);
  border: solid 0.2vh black;
  background-color: #f25757;
  color: #fff;
  font-size: 5vh;
}

.rechoice:hover {
  background-color: #b82840;
  color: #eee;
}

.ad {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 10vh;
  background-color: violet;
}
</style>
