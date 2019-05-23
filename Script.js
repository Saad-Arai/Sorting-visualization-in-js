function Sort() { };

Sort.container = "#container";

//values of array 
Sort.num_boxes = 39;
Sort.boxes = [];

//variable decleration
Sort.intervalID = 0;
Sort.i = 0;
Sort.j = 0;
Sort.min = 0;
Sort.key = 0;
Sort.flag = 0;
function Box(x, height, lightness) {
    this.x = x;
    this.height = height;
    this.color = "hsl(238, 11%, " + lightness + "19%)";
    //A $ sign to define/access jQuery
    //A (selector) to "query (or find)" HTML elements
    this.div = $("<div>")
        //A jQuery action() to be performed on the element(s)
        //The addClass() method adds one or more class names to the selected elements.
        .addClass("box")
        .css({
            "height": height,
            "left": x
        });
    this.setBG(true);
};
// It is simply an object from which other objects can inherit properties.
Box.prototype.setBG = function () {
    $(this.div).css({
        "background": "-webkit-gradient(linear, left top, left bottom, from(" + this.color + "), to(black))"
    })
}


Box.prototype.draw = function () {
    //The append() method inserts specified content at the end of the selected elements.
    $(Sort.container).append(this.div)
}

//.add update the furthur properties of object
Box.prototype.add = function (my) {
    this.x = my;
    //$(this.div).css("left", my);
    $(this.div).animate({ "left": my }, 20);
}


//swap function
Sort.swap = function (i, j) {
    var temp = this.boxes[i];
    var x = temp.x
    this.boxes[i] = this.boxes[j];
    this.boxes[j] = temp;
    this.boxes[j].add(this.boxes[i].x);
    this.boxes[i].add(x);
}

//mix elements or values function
Sort.mix = function () {
    for (var i = 0; i < (this.num_boxes * 4); i++) {
        //Math.floor round a number downward to its nearest integer:
        //Math.random return a random number between 0 (inclusive) and 1 (exclusive):
        index_i = Math.floor(Math.random() * this.num_boxes);
        index_j = Math.floor(Math.random() * this.num_boxes);
        this.swap(index_i, index_j);
    }
}


//bubble sort function definition
Sort.bubbleR = function () {
    first_box = Sort.boxes[Sort.j];
    second_box = Sort.boxes[Sort.j + 1];

    if (second_box.height < first_box.height) {
        Sort.swap(Sort.j, Sort.j + 1);
    }

    Sort.j++;

    if (Sort.j == Sort.num_boxes - Sort.i - 1) {
        Sort.i++;
        Sort.j = 0;
        if (Sort.i == Sort.num_boxes - 1) {
            //clearinternval to stop or speed down the values
            clearInterval(Sort.intervalID);
            Sort.j = 0;
            Sort.i = 0;
        }
    }

}
//selectionsort function definition
Sort.selectR = function () {

    first_box = Sort.boxes[Sort.min];
    second_box = Sort.boxes[Sort.j + 1];

    if (second_box.height < first_box.height) {
        Sort.min = Sort.j + 1;
    }
    Sort.j++;

    if (Sort.j == Sort.num_boxes - 1) {
        Sort.swap(Sort.min, Sort.i);
        Sort.i++;
        Sort.min = Sort.i;
        Sort.j = Sort.i;
        if (Sort.i == Sort.num_boxes - 1) {
            clearInterval(Sort.intervalID);
            Sort.j = 0;
            Sort.i = 0;
        }
    }

}

//insertion sort function definition
Sort.insertionR = function () {
    Sort.i++;
    Sort.key = Sort.i;
    Sort.j = Sort.i - 1;
    if (Sort.j >= 0 && Sort.boxes[Sort.j].height > Sort.boxes[Sort.key].height) {
        Sort.swap(Sort.j, Sort.key);
        Sort.key = Sort.j;
        Sort.j--;
    }
    if (Sort.i == Sort.num_boxes - 1) {
        clearInterval(Sort.intervalID);
        Sort.j = 0;
        Sort.i = 0;
        Sort.flag = 0;
    }
}

//function calls
Sort.selection = function () {
    //setInterval to set the speed
    Sort.intervalID = setInterval(Sort.selectR, 40);
}

Sort.insertion = function () {
    Sort.intervalID = setInterval(Sort.insertionR, 10);
}
Sort.bubble = function () {
    Sort.intervalID = setInterval(Sort.bubbleR, 80);
}
Sort.quicksort = function () {
    Sort.intervalID = setInterval(Sort.quicksort, 78);
}

//partition function definition for quick sort
Sort.partition = function (left, right) {

    pivot_value = Sort.boxes[left].height;
    Sort.swap(left, right - 1) //move pivot to end
    store_index = left;

    for (var i = left; i < right; i++) {
        if (Sort.boxes[i].height < pivot_value) {
            Sort.swap(i, store_index);
            store_index += 1;
        }
    }
    Sort.swap(store_index, right - 1);
    return store_index;
}

//quick sort function definition
Sort.quicksort = function (left, right) {

    if (right - left <= 1) {
        return
    }
    var part_i = Sort.partition(left, right)

    //settime to set the time or speed but it does not work
    setTimeout(Sort.quicksort(left, part_i), 5000000);
    setTimeout(Sort.quicksort(part_i + 1, right), 500000);

}

$(document).ready(function () {

    $(Sort.container).css({
        width: (Sort.num_boxes * 25) + 8,
        height: (Sort.num_boxes * 10) + 10,
    })


    for (var i = 1; i <= Sort.num_boxes; i++) {
        lightness = (100 - (2.5 * i)) / 100 * 100
        Sort.boxes[i - 1] = new Box((25 * (i - 1)) + 5, 10 * i, lightness);
        Sort.boxes[i - 1].draw();
    }

    $("#mix").click(function () { Sort.mix() });
    $("#bubble").click(function () { Sort.bubble() });
    $("#selection").click(function () { Sort.selection() });
    $("#insertion").click(function () { Sort.insertion() });
    $("#quick").click(function () { Sort.quicksort(0, Sort.boxes.length) });
})
