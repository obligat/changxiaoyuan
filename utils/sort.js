
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



function formatWeek(sortResult) {
    var array = new Array()
    var date = new Date()
    var weekDay = date.getDay()
    var day = [{
        num: '一',
        image: '../../images/Monday.png',
        gradient: ['#32b8d5']
    }, {
        num: '二',
        image: '../../images/Tuesday.png',
        gradient: ['#32b8d5', '#29b5da']
    }, {
        num: '三',
        image: '../../images/Wednesday.png',
        gradient: ['#29b5da', '#16c5d5']
    }, {
        num: '四',
        image: '../../images/Thursday.png',
        gradient: ['#16c5d5', '#0ad9f1']
    }, {
        num: '五',
        image: '../../images/Friday.png',
        gradient: ['#0ad9f1', '#2af2fa']
    }]
    for (var i = 0; i < day.length; i++) {
        if (sortResult[i]) {
            sortResult[i].push(day[i])
        }
    }
    // if (weekDay != 0 && weekDay != 5) {
    //     array = sortResult.concat(sortResult.splice(0, weekDay - 1))
    // }
    array = sortResult
    return array;
}


module.exports = {
    filterByWeekNum: filterByWeekNum,
    sortByJT_NO: sortByJT_NO,
    formatWeek: formatWeek
}