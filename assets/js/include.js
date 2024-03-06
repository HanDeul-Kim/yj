$('.header').load('yj/header.html', () => {
    let isLangListOpen = false;
    // 반복문 lang
    const langBtn2 = document.querySelectorAll('.lang');
    const langList2 = document.querySelectorAll('.select-box');
    langBtn2.forEach((e, idx) => {
        e.addEventListener('click', (event) => {
            isLangListOpen = !isLangListOpen;
            if (isLangListOpen) {
                gsap.to(langList2[idx], {
                    height: '120px',
                    duration: 0.15,
                })
            } else {
                gsap.to(langList2[idx], {
                    height: 0,
                    duration: 0.15,
                })
            }
        })
    })


    // pc - 2depth
    const li = document.querySelectorAll('.pc-gnb > li');
    const subWrap = document.querySelectorAll('.sub-wrap');
    li.forEach((e, idx) => {
        e.addEventListener('mouseover', (e) => {
            const sub = e.currentTarget.querySelector('ul');

            for (let i = 0; i < subWrap.length; i++) {
                subWrap[i].classList.remove('on')
            }
            if (sub) {
                sub.classList.add('on')
            }
        })
    })
    let hoverAnim = gsap.to(".sub-wrap", {
        paused: true,
        height: '100%',
        opacity: 1,
        visibility: 'visible',
        duration: '0.1',
        ease: 'linear',
    })

    document.querySelector('.pc-gnb').addEventListener('mouseenter', () => hoverAnim.play())
    document.querySelector('.pc-gnb').addEventListener('mouseleave', () => hoverAnim.reverse())


    // m-gnb
    const mOpen = document.querySelector('.m-gnb-wrap .gnb-btn');
    const mGnb = document.querySelector('.m-gnb')
    const depth1 = document.querySelectorAll('.m-gnb-list > li');
    const depth2 = document.querySelectorAll('.m-2depth');
    if (mOpen) {
        mOpen.addEventListener('click', () => {
            toggleClass(mOpen, 'on');
            toggleClass(mGnb, 'on');
            closeGnb(depth1, depth2);
            document.querySelector('body').classList.toggle('hidden')
        });

        function toggleClass(el, className) {
            el.classList.toggle(className);
        }
        function closeGnb(...el) {
            el.forEach((e) => {
                e.forEach((e) => {
                    e.classList.remove('active')
                })
            })
        }


        const mGnbMenu = document.querySelectorAll('.m-gnb-list li');
        mGnbMenu.forEach((e, idx) => {
            e.addEventListener('click', (event) => {
                if (event.currentTarget.querySelector('.m-2depth')) {
                    event.currentTarget.querySelector('.m-2depth').classList.toggle('active')
                    e.classList.toggle('active')
                }
            })
        })
    }
});
$('.footer').load('yj/footer.html');