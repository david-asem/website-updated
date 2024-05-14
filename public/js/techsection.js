var techServices = document.querySelectorAll('.tech-service');
var tsIcons = document.querySelectorAll(".ts-icons .ts");
var index = 0;
var techConnectionLines = document.querySelectorAll('.javLineLink path')
console.log(techConnectionLines)

setInterval(function () {
    techServices[index].classList.remove('opacity-100');
    tsIcons[index].classList.add('unfocus-tech')
    techServices[index].classList.add('opacity-0');
    techServices[index].style.transition = "opacity " + 1000 + "ms";
    tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms, transform" + 1000 + "ms, opacity" + 1000 + "ms";
    techConnectionLines[index]?.classList.add('animated-line')

    index = (index + 1) % techServices.length;

    setTimeout(function () {
        techServices[index].classList.remove('opacity-0');
        techServices[index].classList.add('opacity-100');
        techServices[index].style.transition = "opacity " + 1000 + "ms";
        tsIcons[index].classList.remove('unfocus-tech')
        let new_idx = index - 1 == -1 ? 3 : index - 1
        techConnectionLines[new_idx]?.classList.remove('animated-line')
        tsIcons[index].style.transition = "background-color " + 1000 + "ms, fill " + 1000 + "ms transform" + 1000 + "ms, opacity" + 1000 + "ms";
    }, 1500);
}, 3000);



