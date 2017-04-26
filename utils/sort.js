
function filterByWeekNum(rawArray) {
    var array = new Array([], [], [], [], [])
    for (var i = 0; i < rawArray.length; i++) {
        switch (rawArray[i].WEEKNUM) {
            case 1:
                array[0].push(rawArray[i]); break;
            case 2:
                array[1].push(rawArray[i]); break;
            case 3:
                array[2].push(rawArray[i]); break;
            case 4:
                array[3].push(rawArray[i]); break;
            case 5:
                array[4].push(rawArray[i]); break;
        }
    }

    return array;
}

function sortByJT_NO(filterResult) {
    var array = new Array([{ "JT_NO": "1-2", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "3-4", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "5-6", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "7-8", "RoomNum": "", "Teach_Name": "" }], [{ "JT_NO": "1-2", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "3-4", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "5-6", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "7-8", "RoomNum": "", "Teach_Name": "" }], [{ "JT_NO": "1-2", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "3-4", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "5-6", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "7-8", "RoomNum": "", "Teach_Name": "" }], [{ "JT_NO": "1-2", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "3-4", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "5-6", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "7-8", "RoomNum": "", "Teach_Name": "" }], [{ "JT_NO": "1-2", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "3-4", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "5-6", "RoomNum": "", "Teach_Name": "" }, { "JT_NO": "7-8", "RoomNum": "", "Teach_Name": "" }])
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            array[i][j] = filterResult[i].find((item) => {
                if (item.JT_NO == array[i][j].JT_NO) {
                    return item;
                }
            })
        }
    }
    return array;
}


module.exports = {
    filterByWeekNum: filterByWeekNum,
    sortByJT_NO: sortByJT_NO
}