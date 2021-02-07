particlesJS("particles-js",{particles:{number:{value:50,density:{enable:!0,value_area:800}},color:{value:"#888"},shape:{type:"circle",stroke:{width:0,color:"#888"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.8,random:!1,anim:{enable:!1,speed:3,opacity_min:.1,sync:!1}},size:{value:5,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#888",opacity:.4,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0,config_demo:{hide_card:!1,background_color:"#b61924",background_image:"",background_position:"50% 50%",background_repeat:"no-repeat",background_size:"cover"}});
window.addEventListener('load', e => {
    new PWAConfApp();
    registerSW(); 
  });
  async function registerSW() { 
    if ('serviceWorker' in navigator) { 
      try {
        await navigator.serviceWorker.register('./sw.js'); 
      } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.'); 
      }
    } else {
      document.querySelector('.alert').removeAttribute('hidden'); 
    }
  }