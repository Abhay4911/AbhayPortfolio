/* =========================================================
  BACK TO TOP
========================================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }
);


/* SMOOTH SCROLL */

backToTop.addEventListener(
    "click",
    function (e) {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);

/* =========================================================
   HERO 3D MOUSE EFFECT
========================================================= */

const scene3D =
    document.getElementById("photoScene");

const photoCard =
    document.getElementById("photoCard");

const heroText =
    document.querySelector(".hero-text");


scene3D.addEventListener(
    "mousemove",
    function (e) {

        const rect =
            scene3D.getBoundingClientRect();


        const x =
            (e.clientX - rect.left)
            / rect.width - .5;


        const y =
            (e.clientY - rect.top)
            / rect.height - .5;


        photoCard.style.transform = `

      rotateY(${x * 18}deg)

      rotateX(${-y * 14}deg)

      translateZ(100px)

    `;


        heroText.style.transform = `

      rotateY(${x * -3}deg)

      rotateX(${y * 3}deg)

      translateZ(20px)

    `;

    }
);


scene3D.addEventListener(
    "mouseleave",
    function () {

        photoCard.style.transform = `

      rotateY(-10deg)

      rotateX(5deg)

      translateZ(80px)

    `;


        heroText.style.transform =
            "translateZ(0)";

    }
);



/* =========================================================
   THREE JS
========================================================= */

(function () {


    const canvas =
        document.getElementById("hero-canvas");


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            60,
            window.innerWidth /
            window.innerHeight,
            .1,
            100
        );


    camera.position.z = 7;



    const renderer =
        new THREE.WebGLRenderer({

            canvas: canvas,

            alpha: true,

            antialias: true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );



    /* =====================================================
       BIG 3D OBJECT
    ===================================================== */

    const geometry =
        new THREE.IcosahedronGeometry(
            2.5,
            2
        );


    const material =
        new THREE.MeshBasicMaterial({

            color: 0x4f8cff,

            wireframe: true,

            transparent: true,

            opacity: .16

        });


    const object =
        new THREE.Mesh(
            geometry,
            material
        );


    object.position.x = 1.3;

    object.position.y = .1;


    scene.add(object);



    /* =====================================================
       INNER OBJECT
    ===================================================== */

    const geometry2 =
        new THREE.IcosahedronGeometry(
            1.8,
            1
        );


    const material2 =
        new THREE.MeshBasicMaterial({

            color: 0x22d3ee,

            wireframe: true,

            transparent: true,

            opacity: .12

        });


    const object2 =
        new THREE.Mesh(
            geometry2,
            material2
        );


    object2.position.x = 1.3;


    scene.add(object2);



    /* =====================================================
       SMALL FLOATING CUBES
    ===================================================== */

    const cubes = [];


    for (let i = 0; i < 12; i++) {


        const cubeGeometry =
            new THREE.BoxGeometry(
                .07,
                .07,
                .07
            );


        const cubeMaterial =
            new THREE.MeshBasicMaterial({

                color:
                    i % 2 === 0
                        ? 0x4f8cff
                        : 0x22d3ee,

                transparent: true,

                opacity: .65

            });


        const cube =
            new THREE.Mesh(
                cubeGeometry,
                cubeMaterial
            );


        cube.position.x =
            (Math.random() - .5) * 10;


        cube.position.y =
            (Math.random() - .5) * 6;


        cube.position.z =
            (Math.random() - .5) * 4;


        cube.userData.speed =
            .002 +
            Math.random() * .004;


        scene.add(cube);


        cubes.push(cube);

    }



    /* =====================================================
       PARTICLES
    ===================================================== */

    const particleCount = 350;


    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        positions[i * 3] =
            (Math.random() - .5) * 18;


        positions[i * 3 + 1] =
            (Math.random() - .5) * 11;


        positions[i * 3 + 2] =
            (Math.random() - .5) * 9;

    }


    const particleGeometry =
        new THREE.BufferGeometry();


    particleGeometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xbdd8ff,

            size: .025,

            transparent: true,

            opacity: .38

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(particles);



    /* =====================================================
       MOUSE
    ===================================================== */

    let mouseX = 0;

    let mouseY = 0;


    window.addEventListener(
        "mousemove",
        function (e) {

            mouseX =
                e.clientX /
                window.innerWidth - .5;


            mouseY =
                e.clientY /
                window.innerHeight - .5;

        }
    );



    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate() {

        requestAnimationFrame(
            animate
        );


        object.rotation.x += .0008;

        object.rotation.y += .002;


        object2.rotation.x -= .0005;

        object2.rotation.y -= .0015;


        particles.rotation.y += .0003;



        cubes.forEach(
            cube => {

                cube.rotation.x +=
                    cube.userData.speed;

                cube.rotation.y +=
                    cube.userData.speed;

            }
        );



        camera.position.x +=
            (
                mouseX * 1.0 -
                camera.position.x
            ) * .025;


        camera.position.y +=
            (
                -mouseY * .7 -
                camera.position.y
            ) * .025;


        camera.lookAt(
            scene.position
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();



    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );


})();


