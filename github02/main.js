((_win, $) => {
    const renderer = new PIXI.Renderer({
        view: canvas,
        width: _win.innerWidth,
        height: _win.innerHeight,
        resolution: _win.devicePixelRatio,
        autoDensity: !0,
		antialias: !0
    });
    const stage = new PIXI.Container();
    const resources = PIXI.Loader.shared.resources
        Sprite = PIXI.Sprite
        Text = PIXI.Text
        Style = PIXI.TextStyle
        Ticker = PIXI.Ticker
        Loader = PIXI.Loader.shared
        TextureCache = PIXI.utils.TextureCache;
    const initWidth = 1920
        initHeight = 1080;
    let played = !1;
    let time = new Date();
    Loader
        .add([{
            name: "Background",
            url: "texture/background.png"
        }, {
            name: "Sun",
            url: "texture/sun.png"
        }, {
            name: "Magic Circle 1",
            url: "texture/maoucircle1.png"
        }, {
            name: "Magic Circle 2",
            url: "texture/maoucircle2.png"
        }, {
            name: "Magic Circle 3",
            url: "texture/maoucircle3.png"
        }])
        .on("progress", (loader, resource) => {
            console.log(`Core | Loading ${resource.name} --- Progress: ${loader.progress}%`);
        })
        .load(draw);
    _win.addEventListener("resize", resize);
    function draw() {
        console.log("Core | Drawing...");
		let bg = new Sprite(resources["Background"].texture);
        let sun = new Sprite(resources["Sun"].texture);
        let mc1 = new Sprite(resources["Magic Circle 1"].texture);
        let mc2 = new Sprite(resources["Magic Circle 2"].texture);
        let mc3 = new Sprite(resources["Magic Circle 3"].texture);
        let mc = new PIXI.Container();
		let ratio = 1;
        mc.addChild(mc1, mc2, mc3);
        stage.addChild(bg, mc, sun);
        bg.position.set(renderer.screen.width/2, renderer.screen.height/2);
        bg.anchor.set(0.5, 0.5);
        bg.scale.set(renderer.screen.width/initWidth * 0.5, renderer.screen.width/initWidth * 0.5);
        //sun.visible = !0;
        sun.position.set(renderer.screen.width/2, renderer.screen.height/2);
        sun.anchor.set(0.5, 0.5);
        sun.scale.set(renderer.screen.width/initWidth * 0.25 * ratio, renderer.screen.width/initWidth * 0.25 * ratio);
        mc.position.set(renderer.screen.width/2, renderer.screen.height/2);
        mc.scale.set(renderer.screen.width/initWidth * 1.5 * ratio, renderer.screen.width/initWidth * 1.5 * ratio);
        mc1.anchor.set(0.5, 0.5);
        mc2.anchor.set(0.5, 0.5);
        mc3.anchor.set(0.5, 0.5);
        let style = new Style({
            fontSize: "36px",
            fill: "white",
            align: "center"
        });
        let text1 = new Text("Click to play music", style);
        let text2 = new Text(time, style);
        text1.anchor.set(0.5, 0);
        text2.anchor.set(0.5, 1);
        text1.position.set(renderer.screen.width/2, 0);
        text2.position.set(renderer.screen.width/2, renderer.screen.height);
        stage.addChild(text1, text2);
        renderer.render(stage);
        let animate = new Ticker();
        animate.add((delta) => {
            time = new Date();
            let mouse = renderer.plugins.interaction.mouse.global.x != -999999 ?
                        renderer.plugins.interaction.mouse.global : {
                x: renderer.screen.width/2,
                y: renderer.screen.height/2
            };
            let x = (renderer.screen.width/2 + mouse.x - renderer.screen.width)/5;
            let y = (renderer.screen.height/2 + mouse.y - renderer.screen.height)/5;
            //console.log(`${x} ${y}`);
			bg.position.set(renderer.screen.width/2, renderer.screen.height/2);
			bg.scale.set(renderer.screen.width/initWidth * 0.5, renderer.screen.width/initWidth * 0.5);
            sun.position.set(renderer.screen.width/2 - (x/1.5), renderer.screen.height/2 - (y/1.5));
            sun.scale.set(renderer.screen.width/initWidth * 0.25 * ratio, renderer.screen.width/initWidth * 0.25 * ratio);
            sun.rotation += 0.01 * delta;
            mc.position.set(renderer.screen.width/2 - x, renderer.screen.height/2 - y);
            mc.scale.set(renderer.screen.width/initWidth * 1.5 * ratio, renderer.screen.width/initWidth * 1.5 * ratio);
            mc1.rotation += 0.01 * delta;
            mc2.rotation -= 0.0075 * delta;
            mc3.rotation += 0.005 * delta;
            text2.text = `${time} | FPS: ${Math.round(animate.FPS)}`;
            text1.position.set(renderer.screen.width/2, 0);
            text1.scale.set(renderer.screen.width/initWidth * 1 * ratio, renderer.screen.width/initWidth * 1 * ratio);
            text2.position.set(renderer.screen.width/2, renderer.screen.height);
            text2.scale.set(renderer.screen.width/initWidth * 1 * ratio, renderer.screen.width/initWidth * 1 * ratio);
            renderer.render(stage);
        });
        document.body.style.cursor = "pointer";
        document.body.addEventListener("mousedown", (e) => {
            if (e.button === 0 || e.button === 2) {
                //text1.visible = !1;
                text1.text = "bye exam";
				music();
                return false;
            } else if (e.button === 1) {
				ratio = 1;
            };
        });
        document.body.addEventListener("wheel", (e) => {
			0 > e.wheelDelta && ratio > 0.2 ? ratio *= 88 / 100 : 0 < e.wheelDelta && ratio < 5 ? ratio /= 88 / 100 : ratio
        });
        animate.start();
    };
    /*function emit() {
        const emitter = new PIXI.particles.Emitter;
    };*/
    function resize() {
        renderer.resize(_win.innerWidth, _win.innerHeight);
    };
    function music() {
        if (played) return;
        console.log("Core | Playing deadly DSE music...")
        played = !0;
        document.body.style.cursor = "inherit";
        const audio = new Audio("dse.mp4");
        audio.play();
        audio.loop = !0;
    }
    _win.renderer = renderer;
})(window, window.jQuery);