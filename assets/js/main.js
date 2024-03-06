// include




const sideNavBtns = document.querySelectorAll('.navi');
if (sideNavBtns) {
    sideNavBtns.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    x: 0,
                    y: `${anchor.getAttribute('href')}`,
                    ease: "power3.out"
                },
                // callback
                // onComplete: () => {
                //     alert('test')
                // }
            })
        })
    })
}


let ww = window.innerWidth;

const shrinkTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#business",
        scrub: 1,
        start: "top top",  //  trigger 시작점, 현재화면 시작점
        // end: "+=10400",
        end: `${ww * 6}`,
        // end: "bottom top",
        pin: true,
        // duration:50
    },
});

shrinkTl.to("#business .parallax-wrap", {
    scale: 0.4,
    // duration:0.1
}).to("#business .p-box", {
    left: "100%",
}).to("#business .parallax-wrap", {
    left: "-100%",
}, '-=100%').to("#business .p-box1", {
    left: "100%",
}, '-=100%').to("#business .parallax-img1", {
    left: "-100%",
}, '-=100%').to("#business .p-box2", {
    left: "100%",
}, '-=50%').to("#business .parallax-img2", {
    left: "-100%",
}, '-=100%').to("#business .p-box3", {
    left: "100%",
}, '-=50%').to("#business .parallax-img3", {
    left: "-100%",
}, '-=100%').to("#business .p-box4", {
    left: "100%",
}, '-=50%').to("#business .parallax-img4", {
    left: "-100%",
}, '-=100%').to("#business .p-box5", {
    left: "100%",
}, '-=50%').to("#business .parallax-img5", {
    left: "-100%",
}, '-=100%')

const fixMotion2 = gsap.timeline({
    scrollTrigger: {
        // trigger:".sc_intro .img_area",
        trigger: ".sc_intro",
        start: "top top",
        // end:"bottom top",
        end: "+=5000",
        // markers:true,  
        scrub: 1,
        pin: true,
    },
})

fixMotion2.from('.sc_intro .img_area .img02 img', { scale: 5, yPercent: 50 })
    .to('.mission-tit', { opacity: 0 }, '-=50%')
    .addLabel('pos1', '0.1')
    .addLabel('pos2', '0.2')
    .addLabel('pos3', '0.3')
    .addLabel('pos4', '0.5')
    .from('.sc_intro .img_area .img01', { scale: 2, xPercent: -250 }, 'pos3')
    .from('.sc_intro .img_area .img03', { scale: 2, xPercent: 250 }, 'pos3')
    .from('.sc_intro .img_area .img02 .stroke', { opacity: '0' }, 'pos4')
    .from('.sc_intro .img_area .img02 .txt_wrap', { opacity: '0', top: 200 }, 'pos4')
    .from('.sc_intro .img_area p', { yPercent: 200 }, 'pos3')

const solList = document.querySelectorAll('.sol-list li');
solList.forEach((e, idx) => {
    e.addEventListener('click', (ef) => {

        for (let i = 0; i < solList.length; i++) {
            solList[i].classList.remove('active')
        }
        e.classList.add('active');
    })
})
AOS.init()




// test.to("#business .parallax-wrap", {
//     scale: 0.4,
//     // duration:0.1
// }).to("#business .p-box", {
//     left: "100%",
// }).to("#business .parallax-wrap", {
//     left: "-100%",
// }, '-=100%').to("#business .p-box1", {
//     left: "100%",
// }, '-=100%').to("#business .parallax-img1", {
//     left: "-100%",
// }, '-=100%').to("#business .p-box2", {
//     left: "100%",
// }, '-=50%').to("#business .parallax-img2", {
//     left: "-100%",
// }, '-=100%').to("#business .p-box3", {
//     left: "100%",
// }, '-=50%').to("#business .parallax-img3", {
//     left: "-100%",
// }, '-=100%').to("#business .p-box4", {
//     left: "100%",
// }, '-=50%').to("#business .parallax-img4", {
//     left: "-100%",
// }, '-=100%').to("#business .p-box5", {
//     left: "100%",
// }, '-=50%').to("#business .parallax-img5", {
//     left: "-100%",
// }, '-=100%')





if (document.querySelector('.layout-md.card')) {
    function layoutBox() {
        const addSize = document.querySelector('.layout-md.card').offsetLeft;
        const cards = document.querySelectorAll('.cards')
        cards.forEach((e, idx) => {
            e.style.width = `calc(100% + ${addSize}px + 0.1px)`
        })
        document.querySelector('.layout-md.visible.card:last-child').style.maxWidth = `calc(1386px + ${addSize})`
    }
    window.addEventListener('load', layoutBox);
    window.addEventListener('resize', layoutBox);
}






