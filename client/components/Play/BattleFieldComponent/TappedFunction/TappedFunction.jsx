export function tapCard(setIsTapped, card, setOpen, isTapped ) {
    var hasNumber = /\d/
    if((card.types.includes('Land') || card.types.includes('Artifact')) && !isTapped) {
        let text = card.text.split(".")
        let add = text.filter(line => line.includes('Add'))
        if(!hasNumber.test(add)) {
            if(!add.toString().includes('or')) {
                for(let j = 0; j < add.toString().length; j++) {
                    if ((add.toString().substr(j, 3)) == '{W}') null
                    if ((add.toString().substr(j, 3)) == '{U}') null
                    if ((add.toString().substr(j, 3)) == '{B}') null
                    if ((add.toString().substr(j, 3)) == '{R}') null
                    if ((add.toString().substr(j, 3)) == '{G}') null
                    if ((add.toString().substr(j, 3)) == '{C}') null
                }
            } else {
                for(let j = 0; j < add.toString().length; j++) {
                    if ((add.toString().substr(j, 3)) == '{W}') null
                    if ((add.toString().substr(j, 3)) == '{U}') null
                    if ((add.toString().substr(j, 3)) == '{B}') null
                    if ((add.toString().substr(j, 3)) == '{R}') null
                    if ((add.toString().substr(j, 3)) == '{G}') null
                    if ((add.toString().substr(j, 3)) == '{C}') null
                }
                setOpen(true)
            }
        } else {
            for(let j = 0; j < add.toString().length; j++) {
                if ((add.toString().substr(j, 3)) == '{1}') null
            }
        }
        setIsTapped(true)
    }
}