(function () {

    // ================= 🔐 LOCK SYSTEM =================
    const projectID = "admin-panel-6c101";
    const dbURL = `https://${projectID}-default-rtdb.firebaseio.com/users.json`;

    // 20-digit unique ID logic (Retained from local storage)
    let myUID = localStorage.getItem('shah_script_uid');
    if (!myUID) {
        myUID = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
        localStorage.setItem('shah_script_uid', myUID);
    }

    fetch(dbURL).then(r => r.json()).then(data => {
        let isUnlocked = false;
        if (data) {
            Object.values(data).forEach(user => {
                if (user.id === myUID) isUnlocked = true;
            });
        }

        if (isUnlocked) {
            startMainSystem();
        } else {
            showLockScreen();
        }
    }).catch(() => alert("Connection Error"));

    // ================= 🎨 LOCK SCREEN UI =================
    function showLockScreen() {
        const overlay = document.createElement('div');
        overlay.style = `
            position:fixed; inset:0; background:#0e121a; z-index:999999;
            display:flex; justify-content:center; align-items:center; font-family:sans-serif;`;

        overlay.innerHTML = `
        <div style="background:white;width:340px;padding:30px;border-radius:25px;text-align:center;box-shadow:0 15px 40px rgba(0,0,0,0.5);">
            <img src="icon.png" style="width:80px;margin-bottom:10px;">
            <div style="background:#f1f5f9;color:#334155;padding:10px;border-radius:10px;font-family:monospace;font-size:14px;border:1px dashed #34ace1;margin-bottom:10px;word-break:break-all;">
                ${myUID}
            </div>
            <div style="color:black;font-size:26px;font-weight:900;letter-spacing:2px;margin-bottom:5px;">LOCKED</div>
            <hr style="border:0;height:1px;background:#eee;margin-bottom:20px;">
            <div style="text-align:left;padding:0 10px;">
                <div style="display:flex;align-items:center;margin-bottom:12px;">
                    <img src="tg.webp" style="width:22px;margin-right:10px;">
                    <a href="https://t.me/shahwintrader" style="text-decoration:none;color:#0088cc;font-size:14px;font-weight:bold;">@shahwintrader</a>
                </div>
                <div style="display:flex;align-items:center;margin-bottom:12px;">
                    <img src="tg.webp" style="width:22px;margin-right:10px;">
                    <a href="https://t.me/+tcwSMbhYwigwZTJk" style="text-decoration:none;color:#0088cc;font-size:13px;">JOIN TELEGRAM CHANNEL</a>
                </div>
                <div style="display:flex;align-items:center;margin-bottom:12px;">
                    <img src="https://www.freeiconspng.com/thumbs/logo-whatsapp-png/logo-whatsapp-png-pic-0.png" style="width:22px;margin-right:10px;">
                    <a href="https://whatsapp.com/channel/0029Vb7oKZTLo4hmEpup5A3X" style="text-decoration:none;color:#25d366;font-size:14px;font-weight:bold;">JOIN WHATSAPP GROUP</a>
                </div>
            </div>
            <div style="margin-top:15px;font-size:12px;color:#777;font-weight:bold;"></div>
            <button onclick="location.reload()" style="margin-top:20px;width:100%;background:black;color:white;border:none;padding:12px;border-radius:12px;font-weight:bold;cursor:pointer;">RELOAD</button>
        </div>`;
        document.body.appendChild(overlay);
    }

    // ================= 🚀 NEXT CANDLE SYSTEM =================
    function startMainSystem() {
        const loader = document.createElement("div");
        loader.id = "main-loader";
        loader.style = `position:fixed;inset:0;display:flex;justify-content:center;align-items:center;font-family:sans-serif;color:white;font-size:1.5rem;font-weight:bold;background:rgba(0,0,0,0.85);z-index:99999;`;
        loader.innerText = "LOADING...";
        document.body.appendChild(loader);
        setTimeout(() => loader.remove(), 1000);

        const fileInput = document.getElementById("fileInput");
        const progressBar = document.getElementById("progressBar");
        const progressFill = progressBar.querySelector("div");
        const preview = document.getElementById("preview");

        fileInput.addEventListener("change", function () {
            if (!this.files.length) return;
            preview.innerHTML = "";
            progressBar.style.display = "block";
            progressFill.style.width = "0%";
            let progress = 0;
            const fakeLoad = setInterval(() => {
                progress += 2;
                progressFill.style.width = progress + "%";
                if (progress >= 100) {
                    clearInterval(fakeLoad);
                    showPreview(this.files[0]);
                }
            }, 30);
        });

        function showPreview(file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                preview.innerHTML = `<div style="text-align:center;"><img src="${e.target.result}" class="prev"><div style="color:white;margin-top:10px;font-size:14px;">Analyzing chart...</div></div>`;
                setTimeout(showSignal, 2500);
            };
            reader.readAsDataURL(file);
        }

        // --- SHOW SIGNAL USING EXTERNAL JS VARIABLES ---
        function showSignal() {
            const isCall = Math.random() > 0.5;
            // window.png1 aur window.png2 external files se aa rahe hain
            const imgSrc = isCall ? window.png1 : window.png2;

            preview.innerHTML += `
                <div style="margin-top:15px;padding:15px;background:#000;border:2px solid #34ace1;border-radius:12px;text-align:center;">
                    <img src="${imgSrc}" style="width:100px;height:100px;margin-bottom:10px;">
                    <div style="color:#aaa;font-size:12px;">NEXT CANDLE PREDICTION</div>
                </div>`;
            setTimeout(resetSystem, 6000);
        }

        function resetSystem() {
            progressBar.style.display = "none";
            progressFill.style.width = "0%";
            fileInput.value = "";
        }
    }
})();


