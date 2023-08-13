function switchTest(value) {

    switch (value) {
        case 1:
            console.log("case 1 子句 : default之前");
            break;

        case 2:
            console.log("case 2 子句 : default之前");

        case 3:
            console.log("case 3 子句 : default之前");
            break;

        case 4:
            console.log("case 4 子句 : default之前");

        case 5:
            console.log("case 5 子句 : default之前");

        default:
            console.log("default子句");

        case 6:
            console.log("case 6 子句 : default之后");

        case 7:
            console.log("case 7 子句 : default之后");
    }

    console.log("switch语句后面的语句");

}