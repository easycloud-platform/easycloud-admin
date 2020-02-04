<template>
  <div class="login_container">
    <div class="logo">
      <img src="../../assets/icon/icon.png" />
    </div>
    <div class="header">
      <div class="title">{{this.$global.appName}}</div>
      <div class="subtitle">{{this.$global.appDesc}}</div>
    </div>
    <div class="body">
      <div class="card">
        <div class="login_name">
          <div class="login_name_icon">
            <img src="../../assets/img/login/user.png" />
          </div>
          <input
            type="text"
            maxlength="30"
            placeholder="用户名"
            autofocus
            v-model="name"
            @focus="focusName"
          />
        </div>
        <div class="login_pwd">
          <div class="login_pwd_icon">
            <img src="../../assets/img/login/password.png" />
          </div>
          <input
            type="password"
            autocomplete="pwd"
            maxlength="30"
            autofocus
            placeholder="密码"
            v-model="psw"
            @keyup.enter="loginHandler"
            @focus="focusPwd"
          />
        </div>
        <div class="login_btn" @click="loginHandler">
          <span>登录</span>
        </div>
        <span class="company">
          {{this.$global.appDate}}
        </span>
      </div>
    </div>
    <div id="pointContainer"></div>
  </div>
</template>

<script>
import router from "../../router/index";
import * as api from "@/axios/api.js";
import { setToken, getToken } from "@/axios/util";
import store from "@/vuex/store.js";
import Cookies from "js-cookie";
import * as THREE from "three";
let SEPARATION = 100,
  AMOUNTX = 100,
  AMOUNTY = 70;

let container;
let camera, scene, renderer;

let particles,
  particle,
  count = 0;

let mouseX = 85,
  mouseY = -342;
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

let canvas
let context
let proton
let renderer2
let emitter
export default {
  name: "login",
  data() {
    return {
      loginType: "user",
      userTypeStyle:
        "background:rgba(0,73,156,1);box-shadow:0px 1px 3px 0px rgba(255,255,255,0.5);border-radius:6px 0px 6px 0px;cursor: pointer;",
      adminTypeStyle:
        "background:rgba(0,73,156,1);box-shadow:0px 1px 3px 0px rgba(255,255,255,0.5);border-radius:0px 6px 0px 6px;cursor: pointer;",
      name: "",
      psw: "",
      states: {
        nameFocusing: false,
        pswFocusing: false,
        keepPsw: false,
        eyeOpen: false
      }
    };
  },
  components: {},

  mounted() {
    this.initPoint();
    this.animate();
  },

  methods: {
    clearCache() {
      this.clearScene();
    },
    loginUserClick() {
      this.loginType = "user";
    },
    focusName() {
      this.states.nameFocusing = true;
      this.states.pswFocusing = false;
    },
    focusPwd() {
      this.states.nameFocusing = false;
      this.states.pswFocusing = true;
    },
    loginHandler() {
      // 登录模块输入框前端校验
      if (this.name.trim().length === 0) {
        this.$notify({
          title: "警告",
          message: "请输入用户名！",
          type: "warning"
        });
        return;
      }

      if (!this.psw.trim()) {
        this.$notify({
          title: "警告",
          message: "请输入密码！",
          type: "warning"
        });
        return;
      }
      /* if (this.psw.trim().length < 10) {
          this.$message.error('登录失败，用户名或密码错误')
          return
        }*/
      this.loginAction(this.name, this.psw);
    },
    loginAction(userName, passWord) {
      let param = {
        password: passWord,
        loginName: userName
      };
      let that = this;
      api
        .login(param)
        .then(res => {
          if (res.data.code === "1") {
            setToken(res.data.message);
            api
              .getUserInfo()
              .then(req => {
                if (req.data.code === "1") {
                  that.$notify({
                    title: "登录成功",
                    message: "欢迎回来" + req.data.rows.name,
                    type: "success"
                  });
                  localStorage.setItem("user", JSON.stringify(req.data.rows));
                  router.push({ name: "home" });
                } else {
                  that.$notify.error({
                    title: "服务器出小差了",
                    message: req.data.message
                  });
                }
              })
              .catch(() => {
                that.$notify.error({
                  title: "服务器出小差了",
                  message: "请您稍后再试"
                });
              });
          } else {
            that.$notify.error({
              title: "登录失败",
              message: "用户名或密码错误"
            });
          }
        })
        .catch(() => {
          that.$notify.error({
            title: "服务器出小差了",
            message: "请您稍后再试"
          });
        });
    },
    initPoint() {
      let container = document.getElementById("pointContainer");
      camera = new THREE.THREE.PerspectiveCamera(
        120,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 1000;

      scene = new THREE.THREE.Scene();

      particles = new Array();

      var PI2 = Math.PI * 2;
      var material = new THREE.THREE.ParticleCanvasMaterial({
        color: "#1089ff",
        vertexColors: true,
        program: function(context) {
          context.beginPath();
          context.arc(0, 0, 0.6, 0, PI2, true);
          context.fill();
        }
      });

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++] = new THREE.THREE.Particle(material);
          particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          scene.add(particle);
        }
      }

      renderer = new THREE.THREE.CanvasRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      /* document.addEventListener("mousemove", this.onDocumentMouseMove, false);
        document.addEventListener("touchstart", this.onDocumentTouchStart, false);
        document.addEventListener("touchmove", this.onDocumentTouchMove, false); */

      //

      window.addEventListener("resize", this.onWindowResize, false);
    },
    onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    /* onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    },
    onDocumentTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    },
    onDocumentTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }, */
    animate() {
      requestAnimationFrame(this.animate);

      this.render();
    },
    render() {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      var i = 0;

      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          particle = particles[i++];
          particle.position.y =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          particle.scale.x = particle.scale.y =
            (Math.sin((ix + count) * 0.3) + 1) * 2 +
            (Math.sin((iy + count) * 0.5) + 1) * 2;
        }
      }

      renderer.render(scene, camera);

      count += 0.1;
    },
    handleScroll() {
      let top =
        pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (top > 250) {
        this.isFixed = 1;
      } else if (top < 200) {
        this.isFixed = 0;
      }
    },
    handleAnimate() {
      let top =
        pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let vh = document.documentElement.clientHeight;
      let dom = document.querySelectorAll(".animate");
      [].slice.call(dom).forEach(v => {
        if (top + vh > v.offsetTop) {
          var delay = v.dataset.delay;
          if (delay) {
            setTimeout(() => {
              v.style.opacity = 1;
              v.classList.add(v.dataset.ani);
            }, delay);
          } else {
            v.style.opacity = 1;
            v.classList.add(v.dataset.ani);
          }
        } else {
          v.classList.remove(v.dataset.ani);
          v.style.opacity = 0;
        }
      });
    },
    /**
     * 清除模型，模型中有 group 和 scene,需要进行判断
     * @param scene
     * @returns
     */
    clearScene: function() {
      // 从scene中删除模型并释放内存
      let currObj = scene;
      if (currObj instanceof THREE.Scene) {
        let children = currObj.children;
        for (let j = 0; j < children.length; j++) {
          this.deleteGroup(children[j]);
        }
      } else {
        this.deleteGroup(currObj);
      }
      this.animate = function() {};
      camera = null;
      scene = null;
      renderer = null;
    },
    // 删除group，释放内存
    deleteGroup: function(group) {
      if (!group) return;
      // 删除掉所有的模型组内的mesh
      group.traverse(function(item) {
        item.geometry.dispose(); // 删除几何体
        item.material.dispose(); // 删除材质
      });
    }
  },
  beforeDestroy: function() {
    this.clearCache();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-link.el-link--default {
  color: rgba(0, 26, 60, 1) !important;
}
.el-link.el-link--default:hover {
  color: white !important;
}
.login_container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #1a2849;
  background-size: 100% auto;
}
.login_container .logo {
  width: 100%;
  text-align: center;
}
.login_container .logo img {
  margin-top: 2%;
  width: 1.1rem;
  height: 1.1rem;
}
.login_container .body {
  width: 100%;
  margin-top: 3%;
  text-align: center;
}
.login_container .body .card {
  margin: 0 auto;
  width: 30%;
  height: 3rem;
  text-align: center;
  background: linear-gradient(
    89deg,
    rgba(0, 40, 91, 1) 0%,
    rgba(66, 1, 1, 0.603) 100%
  );
  box-shadow: 0px 0px 64px 0px rgba(255, 255, 255, 0.25);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 1);
  z-index: 9999999;
  position: relative;
}
.login_container .body .card .login_role_div {
  width: 100%;
  height: 18%;
}
.login_container .body .card .login_role_div .login_user {
  width: 50%;
  height: 100%;
  float: left;
}
.login_container .body .card .login_role_div .login_user span {
  font-size: 0.15rem;
  font-family: PingFangSC;
  display: block;
  letter-spacing: 1px;
  line-height: 0.55rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}
.login_container .body .card .login_role_div .login_admin {
  width: 50%;
  height: 100%;
  float: left;
  cursor: pointer;
}
.login_container .body .card .login_role_div .login_admin span {
  font-size: 0.15rem;
  font-family: PingFangSC;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 0.55rem;
  display: block;
  color: rgba(255, 255, 255, 1);
}
.login_container .body .card .login_name {
  width: 70%;
  height: 12%;
  margin: 0 auto;
  margin-top: 15%;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 1);
}
.login_container .body .card .login_name .login_name_icon {
  width: 20%;
  height: 100%;
  float: left;
}
.login_container .body .card .login_name .login_name_icon img {
  width: 30%;
  display: block;
  padding-top: 15%;
  margin: 0 auto;
}
.login_container .body .card .login_name input {
  width: 70%;
  height: 100%;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
  letter-spacing: 1px;
  background: transparent !important;
  background-color: transparent;
  outline-style: none;
  border: none;
  float: left;
}

.login_container .body .card .login_pwd {
  width: 70%;
  height: 12%;
  margin: 0 auto;
  margin-top: 5%;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 1);
}
.login_container .body .card .login_pwd input {
  width: 70%;
  height: 100%;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(153, 153, 153, 1);
  line-height: 25px;
  letter-spacing: 1px;
  background: transparent !important;
  background-color: transparent;
  outline-style: none;
  border: none;
  float: left;
}
.login_container .body .card .login_pwd .login_pwd_icon {
  width: 20%;
  height: 100%;
  float: left;
}
.login_container .body .card .login_pwd .login_pwd_icon img {
  width: 30%;
  display: block;
  padding-top: 15%;
  margin: 0 auto;
}
.login_container .body .card .login_btn {
  width: 70%;
  height: 12%;
  margin: 0 auto;
  margin-top: 5%;
  background: rgba(255, 255, 255, 1);
  border-style: solid;
  border-color: rgba(255, 255, 255, 1) rgba(255, 255, 255, 1)
    rgba(255, 255, 255, 1) rgba(255, 255, 255, 1);
  border-radius: 6px;
  cursor: pointer;
}
.login_container .body .card .login_btn span {
  font-size: 0.15rem;
  font-family: PingFangSC;
  font-weight: 600;

  color: rgba(0, 26, 60, 1);
  display: block;
  line-height: 0.4rem;
}
.company {
  font-size: 0.15rem;
  font-family: PingFangSC;
  font-weight: 600;
  color: rgba(0, 26, 60, 1);
  display: block;
  margin-top: 1%;
  line-height: 0.4rem;
}
.login_container .header {
  width: 100%;
  text-align: center;
}
.login_container .header .title {
  font-size: 0.4rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 80px;
  letter-spacing: 3px;
}
.login_container .header .subtitle {
  font-size: 0.2rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 5px;
  letter-spacing: 5px;
  margin-top: 0.1rem;
}

.login_container #pointContainer {
  position: fixed;
  cursor: pointer;
  opacity: 0.9;
  bottom: 0px;
  height: 100%;
  z-index: 1;
}
</style>