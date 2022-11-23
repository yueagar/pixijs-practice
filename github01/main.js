((_win, $) => {
    class Pickaxe {
        static init() {
            console.log("Core | Initializing...")
            this.project = {
                name: "Pixi.js Learning",
                version: "1.0.0",
                author: "YueAgar_c"
            };
            document.oncontextmenu = document.body.oncontextmenu = () => {
                return false;
            };
            this.app = new PIXI.Application({
                width: _win.innerWidth,
                height: _win.innerHeight,
                antialias: true,
                transparent: false,
                resolution: devicePixelRatio,
                autoResize: true
            });
            $("body").append(this.app.view);
            this.app.renderer.view.style.position = "absolute";
            this.app.renderer.view.style.display = "block";
            this.app.renderer.backgroundColor = 0xFFFFFF;
            _win.onresize = () => {
                this.resize();
            };
            this.load();
        };
        static load() {
            PIXI.loader
            .add([{
                name: "Cat",
                url: "texture/cat.png"
            }, {
                name: "Sun",
                url: "texture/sun.png"
            }, {
                name: "MC1",
                url: "texture/maoucircle1.png"
            }, {
                name: "MC2",
                url: "texture/maoucircle2.png"
            }, {
                name: "MC3",
                url: "texture/maoucircle3.png"
            }])
            .on("progress", (loader, resource) => {
                console.log(`Core | Loading: ${resource.name} | Process: ${loader.progress}%`);
            })
            .load(this.draw);
        };
        static draw() {
            let resources = PIXI.loader.resources,
                Sprite = PIXI.Sprite,
                Text = PIXI.Text,
                Style = PIXI.TextStyle,
                TextureCache = PIXI.utils.TextureCache;
            let e = Pickaxe;
            console.log("Core | Drawing...");
            let app = e.app;
            let cat = new Sprite(resources["Cat"].texture);
            let sun = new Sprite(resources["Sun"].texture);
            let mc1 = new Sprite(resources["MC1"].texture);
            let mc2 = new Sprite(resources["MC2"].texture);
            let mc3 = new Sprite(resources["MC3"].texture);
            let mc = new PIXI.Container();
            let textstyle = new Style({
                align: "center",
                fontSize: 30
            });
            let text1 = new Text(`FPS: ${~~app.ticker.FPS} | Project: ${Pickaxe.project.name} v${Pickaxe.project.version} by ${Pickaxe.project.author} | 滑鼠左右鍵: 生成太陽 | 滑鼠滾輪鍵: 重置 | Ctrl+Z/DEL: 刪除上一個太陽`, textstyle);
            let updateText = setInterval(() => {
                text1.text = `FPS: ${~~app.ticker.FPS} | Project: ${Pickaxe.project.name} v${Pickaxe.project.version} by ${Pickaxe.project.author} | 滑鼠左右鍵: 生成太陽 | 滑鼠滾輪鍵: 重置 | Ctrl+Z/DEL: 刪除上一個太陽`;
            }, 100);
            cat.scale.set(_win.innerWidth/1920 * 1, _win.innerWidth/1920 * 1);
            text1.scale.set(_win.innerWidth/1920 * 1, _win.innerWidth/1920 * 1)
            mc.addChild(mc1);
            mc.addChild(mc2);
            mc.addChild(mc3);
            app.stage.addChild(mc);
            app.stage.addChild(text1);
            mc1.anchor.set(0.5, 0.5);
            mc2.anchor.set(0.5, 0.5);
            mc3.anchor.set(0.5, 0.5);
            mc.scale.set(_win.innerWidth/1920 * 1.5, _win.innerWidth/1920 * 1.5)
            mc.position.set(_win.innerWidth/2, _win.innerHeight/2);
            app.ticker.add((delta) => {
                mc1.rotation += 0.01 * delta * 3;
                mc2.rotation -= 0.01 * delta * 2;
                mc3.rotation += 0.01 * delta * 1;
            });
            app.stage.addChild(sun);
            /*setTimeout(() => {
                //app.stage.removeChild(cat);
                cat.visible = !1;
                app.stage.addChild(sun);
                setTimeout(() => {
                    cat.visible = !0;
                    sun.visible = !1;
                }, 1000)
            }, 2000);*/
            /*cat.x = _win.innerWidth/2;
            cat.y = _win.innerHeight/2;*/
            sun.anchor.set(0.5, 0.5);
            sun.scale.set(0.3, 0.3);
            sun.position.set(_win.innerWidth/2, _win.innerHeight/2);
            app.ticker.add((delta) => {
                sun.scale.set(_win.innerWidth/1920 * 0.3, _win.innerWidth/1920 * 0.3);
                sun.rotation += 0.01 * delta * 5;
                sun.position.set(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y);            });
            document.addEventListener("mouseup", (e) => {
                if (e.button === 0 || e.button === 2) {
                    let sun2 = new Sprite(resources["Sun"].texture);
                    app.stage.addChild(sun2);
                    sun2.anchor.set(0.5, 0.5);
                    sun2.position.set(app.renderer.plugins.interaction.mouse.global.x, app.renderer.plugins.interaction.mouse.global.y);
                    sun2.scale.set(_win.innerWidth/1920 * 0.3, _win.innerWidth/1920 * 0.3);
                    app.ticker.add((delta) => {
                        sun2.rotation += 0.01 * delta * 5;
                    });
                    return false;
                } else if (e.button === 1) {
                    Pickaxe.clean();
                    Pickaxe.draw();
                };
            });
            let pressedCtrl;
            document.addEventListener("keydown", (e) => {
                if (e.keyCode === 17) pressedCtrl = !0
                if ((e.keyCode === 90 && pressedCtrl) || e.keyCode === 46) {
                    Pickaxe.delete();
                };
            });
            document.addEventListener("keyup", (e) => {
                if (e.keyCode === 17) pressedCtrl = !1;
            });
        };
        
        static resize() {
            console.log("Core | Resizing...");
            this.app.renderer.resize(_win.innerWidth, _win.innerHeight);
            this.clean();
            this.draw();
        };
        static clean() {
            for (let i = this.app.stage.children.length - 1; i >= 0; i--) {
                this.app.stage.removeChild(this.app.stage.children[i]);
            };
        };
        static delete() {
            if (Pickaxe.app.stage.children.length > 3) this.app.stage.removeChild(this.app.stage.children[this.app.stage.children.length-1]);
        };
    };
    _win.Pickaxe = Pickaxe;
    Pickaxe.init();
})(window, window.jQuery);