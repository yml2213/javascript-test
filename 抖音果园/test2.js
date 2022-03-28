let result = {
  "data": {
    "up_grade": true,
    "add_water": 50,
    "nutrient": 0,
    "progress": {
      "current": 0,
      "target": 50,
      "water": 0
    },
    "status": 3,
    "kettle": {
      "water_num": 331,
      "restore_time": 0,
      "is_max": false
    },
    "show_info": {
      "show_bottle": true,
      "show_green_gift": false,
      "show_challenge": true,
      "show_nutrient": false
    },
    "bottle": {
      "water_num": 85,
      "availiable_time": 8,
      "state": 3
    },
    "true_add_water": 10,
    "next_water_times": 10,
    "last_stage_duration": 22628,
    "red_points": {
      "challenge": {
        "id": "0",
        "state": 0,
        "times": 0
      },
      "green_gift": null,
      "box": {
        "times": 3,
        "rounds": 4,
        "state": 3
      }
    },
    "refund_msg": null,
    "newbie": null
  },
  "message": "success",
  "service_time": 1648477242,
  "status_code": 0
}


console.log(result.data.red_points.box);
// console.log(result.data.progress.target);

