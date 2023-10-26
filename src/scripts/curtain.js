const curtain = document.getElementById("curtain");

const toggleNav = () => {
    curtain.dataset.nav = curtain.dataset.nav === "true" ? "false" : "true";
}