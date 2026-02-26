const frm = document.getElementById("frm");
const msg = document.getElementById("msg");

frm.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.className = "msg";
  msg.style.display = "none";

  const data = Object.fromEntries(new FormData(frm).entries());

  const r = await fetch("/api/reclamos", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  const j = await r.json();

  if (!j.ok) {
    msg.classList.add("bad");
    msg.textContent = j.message || "Error";
    msg.style.display = "block";
    return;
  }

  msg.classList.add("ok");
  msg.innerHTML = `✅ Registrado. <br/>Código: <b>${j.codigo}</b><br/>Fecha: ${j.fecha}`;
  msg.style.display = "block";
  frm.reset();
});