const elmts = {
    search: document.querySelector(".search"),
    btnNext: document.querySelector(".btn-next"),
    btnBack: document.querySelector(".btn-back"),
    imagePokemon: document.querySelector(".image-pokemon"),
    idPokemon: document.querySelector(".id-pokemon"),
    namePokemon: document.querySelector(".name-pokemon"),
    form: document.querySelector(".form"),
    index: 1
}
async function search(value) {
    const url = `https://pokeapi.co/api/v2/pokemon/${value}`
    const result = await fetch(url)
    if (result.status === 200) {
        return await result.json()
    }
}
async function choose(e, value) {
    e.namePokemon.innerHTML = "Carregando..."
    e.idPokemon.innerHTML = " "
    const response = await search(value)
    if (response) {
        e.imagePokemon.style.display = "block"
        e.imagePokemon.src = response["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        e.idPokemon.innerHTML = ` -${response["id"]}-`
        e.namePokemon.innerHTML = response["name"]
        e.index = response.id
    } else {
        e.imagePokemon.style.display = "none"
        e.idPokemon.innerHTML = " "
        e.namePokemon.innerHTML = "NOT FOUND"
        setTimeout(() => {
            location.reload()
        }, 2000)
    }

}
elmts.btnNext.onclick = () => {
    elmts.index++
    choose(elmts, elmts.index)
}
elmts.btnBack.onclick = () => {
    if (elmts.index > 1) {
        elmts.index--
        choose(elmts, elmts.index)
    }
}
elmts.form.onsubmit = (event) => {
    event.preventDefault()
    choose(elmts, elmts.search.value.toLowerCase())
}
choose(elmts, elmts.index)





