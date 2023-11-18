function print_arr(arr) {
  if (arr == null) {
    return
  } else if (arr.length == 1) {
    return arr[0]
  } else if (arr.length > 1) {
    let string = arr.join(',')
    console.log(string)
    return string
  }
}

print_arr(['13931333409', '13311222527'])