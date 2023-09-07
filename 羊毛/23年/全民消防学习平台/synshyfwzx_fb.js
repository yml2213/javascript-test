let totalScore = 0;
let round = 0;

while (totalScore < 300) {
    round++; // 记录当前进行的循环次数
    totalScore += 6; // 累加6分

    console.log(`Round ${round} - Total Score: ${totalScore}`);
}

console.log("Game Over");
