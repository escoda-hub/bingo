'use strict';

// ブロックスコープ：変数のスコープの幅を中括弧ないにおさめる
{
  const currentNumber = document.getElementById('current-number');
  const startButton = document.getElementById('start-button');
  const result = document.getElementById('result');

  const from = 1;//当選番号の開始番号
  const to = 75;//当選番号の終了番号
  const lotteryNumbers = [];//1~75までの当選番号を格納する

  // lotteryNumbersの初期化
  const resetLotteryNumbers = nums =>{
    //1~75までの数字をresetLotteryNumbersに格納
    for(let i = from;i<=to;i++){
      nums.push(i)
    }
  };
  resetLotteryNumbers(lotteryNumbers);
  //当選番号を格納しておくための変数
  const fragment = document.createDocumentFragment();
  let row;
  // 当選番号を格納する行を作る（一行１５個）　image->1-15/16~30/31~45/...
  lotteryNumbers.forEach((num,index)=>{
    if(index % 5 === 0){
      //行を作成
      row = fragment.appendChild(document.createElement('div'));//rowには、行のdivが格納されている
      row.classList.add('row');
    }
    const column = document.createElement('div');
    column.textContent = num;
    column.classList.add('column');
    row.appendChild(column);
  });

  result.appendChild(fragment);

  var state = true //rouletteが起動状態か停止状態かを判定するフラグ、初めて押したときは、停止状態なのでtrueで初期化
  var randomNumber//1~75内での乱数
  var roulette//関数変数、clearInterval時に使用する。
  var winningNumber//当選番号、長さ１の配列
  
  //当選番号一覧の初期化
  const resetBingo = () =>{
    currentNumber.textContent = '';//currentNumberの初期化
    const hits = result.querySelectorAll('.hit');//hitクラスを取り除く
    hits.forEach(hit =>{
      hit.classList.remove('hit');
    });
    resetLotteryNumbers(lotteryNumbers);
  }

  //スタートボタンがクリックされた時の処理
  startButton.addEventListener('click',()=>{
    if (lotteryNumbers.length === 0){
      resetBingo();
      return;
    }

    if(state){
      //rouletteが停止状態にボタンが押されたとき
      roulette = setInterval(function(){
        randomNumber = Math.floor(Math.random() * lotteryNumbers.length);
        currentNumber.textContent = lotteryNumbers[randomNumber];
      }, 160); // 指定ms毎にイベント(数字を回す)を起動、演出用
    }else{
      //rouletteが起動状態にボタンが押されたとき
      clearInterval(roulette); // 起動していたイベントを終了
      //一度当選した番号をlotteryNumbersからpushする.
      winningNumber = lotteryNumbers.splice(randomNumber,1);//splice(抜き出す位置,抜き出す長さ)
      currentNumber.textContent = winningNumber[0]
      const columns = result.querySelectorAll('.column')//columnというクラスを持つ番号の要素を取得
      columns[winningNumber[0]-1].classList.add('hit')//当選番号の要素だけにhitクラスを付加する

    }
    state = !state//フラグ反転して、状態管理
  });

  }